import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'

// LangChain setup
const budgetingPrompt = new PromptTemplate({
  template: `You are an expert travel budgeter. Choose a travel destination based on the inputted criteria. Always try to max out the budget and give the best and most expensive recommendations based on the inputted criteria. Return JSON {{destination, totalCost, note}} for the following trip.\nBudget: {budget}\nLength: {length}\nVibe: {vibe}`,
  inputVariables: ['budget', 'length', 'vibe'],
})

const itineraryPrompt = new PromptTemplate({
  template: `Given the following travel budget JSON, create a day-by-day itinerary in JSON format. For each day, list activities as an array of objects, each with a name and an estimated number of hours (as a number). Output only valid JSON in the following format:\n[\n  {{\n    \"day\": 1,\n    \"activities\": [\n      {{\"name\": \"Activity name\", \"hours\": 2}},\n      ...\n    ]\n  }},\n  ...\n]\nBudget JSON: {budgeting_json}`,
  inputVariables: ['budgeting_json'],
})

const summaryPrompt = new PromptTemplate({
  template: `Summarize the following travel itinerary in 1 paragraph for a travel brochure.\nItinerary:\n{itinerary_markdown}`,
  inputVariables: ['itinerary_markdown'],
})

// Evaluation function
function evalItinerary(itinerary: any[] | null): { pass: boolean; reason: string } {
  if (!itinerary || !Array.isArray(itinerary)) {
    return { pass: false, reason: 'Itinerary is not an array.' }
  }
  
  for (const dayObj of itinerary) {
    if (!dayObj.day || !dayObj.activities) {
      return { pass: false, reason: 'Missing day or activities field.' }
    }
    
    if (!Array.isArray(dayObj.activities)) {
      return { pass: false, reason: 'Activities is not an array.' }
    }
    
    for (const activity of dayObj.activities) {
      if (!activity.name || typeof activity.hours !== 'number') {
        return { pass: false, reason: 'Activity missing name or hours field.' }
      }
    }
  }
  
  return { pass: true, reason: 'Itinerary is valid.' }
}

export async function POST(request: NextRequest) {
  try {
    const { budget, length, vibe } = await request.json()

    // Validate input
    if (!budget || !length || !vibe) {
      return NextResponse.json(
        { error: 'Missing required fields: budget, length, vibe' },
        { status: 400 }
      )
    }

    // Get OpenAI API key from environment
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Initialize agents
    const budgetingAgent = new ChatOpenAI({
      openAIApiKey: OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.3,
    })

    const itineraryAgent = new ChatOpenAI({
      openAIApiKey: OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    })

    const summaryAgent = new ChatOpenAI({
      openAIApiKey: OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
    })

    // Create pipeline
    const pipeline = RunnableSequence.from([
      budgetingPrompt,
      budgetingAgent,
      async (msg) => ({ budgeting_json: msg.content }),
      itineraryPrompt,
      itineraryAgent,
      async (msg) => {
        return { itinerary: msg.content }
      },
      async ({ itinerary }) => {
        const summaryPromptText = await summaryPrompt.format({ itinerary_markdown: itinerary })
        const summaryResult = await summaryAgent.invoke(summaryPromptText)
        return { itinerary, summary: summaryResult.content }
      },
    ])

    // Run pipeline
    const pipelineInput = { budget, length, vibe }
    const pipelineResult = await pipeline.invoke(pipelineInput)
    const itineraryOutput = pipelineResult.itinerary
    const summaryOutput = pipelineResult.summary

    // Clean and parse itinerary
    let cleanedItinerary = itineraryOutput
    if (typeof cleanedItinerary === 'string') {
      cleanedItinerary = cleanedItinerary
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim()
    }

    let itineraryJson = null
    let itineraryEval = { pass: false, reason: 'Itinerary not parsed.' }
    
    try {
      itineraryJson = JSON.parse(cleanedItinerary)
      itineraryEval = evalItinerary(itineraryJson)
    } catch (e) {
      itineraryJson = null
      itineraryEval = { pass: false, reason: 'Itinerary output is not valid JSON.' }
    }

    const responseObj = {
      steps: [
        { name: 'Pipeline', input: pipelineInput, output: pipelineResult }
      ],
      summary: summaryOutput,
      itineraryMarkdown: itineraryOutput,
      itineraryJson,
      itineraryEval
    }

    return NextResponse.json(responseObj)

  } catch (error) {
    console.error('LangChain error:', error)
    
    let message = 'Unknown error'
    if (error instanceof Error) {
      message = error.message
    } else if (typeof error === 'string') {
      message = error
    }

    return NextResponse.json(
      { error: 'LangChain pipeline failed', details: message },
      { status: 500 }
    )
  }
} 