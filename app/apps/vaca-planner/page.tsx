'use client'

import Link from 'next/link'
import { useState } from 'react'

interface TravelResult {
  summary: string
  itineraryJson: Array<{
    day: number
    activities: Array<{
      name: string
      hours: number
    }>
  }> | null
  itineraryEval: {
    pass: boolean
    reason: string
  }
}

export default function VacaPlannerPage() {
  const [budget, setBudget] = useState('')
  const [length, setLength] = useState('')
  const [vibe, setVibe] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TravelResult | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget: parseInt(budget),
          length: parseInt(length),
          vibe,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to plan trip')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>
      
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        AI Travel Planner
      </h1>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Get personalized travel recommendations powered by AI. Enter your budget, trip length, and preferred vibe to generate a complete vacation plan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Budget (USD)
              </label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min="1"
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2000"
              />
            </div>

            <div>
              <label htmlFor="length" className="block text-sm font-medium mb-2">
                Trip Length (days)
              </label>
              <input
                type="number"
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min="1"
                max="30"
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 7"
              />
            </div>

            <div>
              <label htmlFor="vibe" className="block text-sm font-medium mb-2">
                Vibe
              </label>
              <select
                id="vibe"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a vibe...</option>
                <option value="beach">🏖️ Beach - Coastal relaxation</option>
                <option value="city">🏙️ City - Urban exploration</option>
                <option value="mountain">🏔️ Mountain - Outdoor adventures</option>
                <option value="culture">🎭 Culture - Museums & history</option>
                <option value="nightlife">🌃 Nightlife - Entertainment</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Planning your trip...' : 'Plan My Trip'}
            </button>
          </form>

          {error && (
            <div className="p-4 border border-red-300 dark:border-red-700 rounded-md bg-red-50 dark:bg-red-900/20">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {loading && (
            <div className="p-8 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-neutral-300 dark:bg-neutral-600 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                AI agents are working on your perfect trip...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-6 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900">
                <h3 className="text-lg font-semibold mb-3">Trip Summary</h3>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Itinerary */}
              {result.itineraryJson && result.itineraryEval.pass && (
                <div className="p-6 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900">
                  <h3 className="text-lg font-semibold mb-4">Day-by-Day Itinerary</h3>
                  <div className="space-y-4">
                    {result.itineraryJson.map((day) => (
                      <div key={day.day} className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                          Day {day.day}
                        </h4>
                        <div className="space-y-1">
                          {day.activities.map((activity, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-neutral-700 dark:text-neutral-300">
                                {activity.name}
                              </span>
                              <span className="text-neutral-500 dark:text-neutral-400">
                                {activity.hours}h
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error in itinerary */}
              {!result.itineraryEval.pass && (
                <div className="p-4 border border-yellow-300 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    ⚠️ {result.itineraryEval.reason}
                  </p>
                </div>
              )}
            </div>
          )}

          {!loading && !result && (
            <div className="p-8 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-center">
              <p className="text-neutral-500 dark:text-neutral-400">
                Enter your travel preferences to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="mt-12 p-6 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold mb-3">How It Works</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
          This app uses a multi-agent AI system powered by LangChain and OpenAI:
        </p>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
          <li><strong>Budgeting Agent:</strong> Selects optimal destination and budget allocation</li>
          <li><strong>Itinerary Agent:</strong> Creates detailed day-by-day activity plans</li>
          <li><strong>Summary Agent:</strong> Generates travel brochure-style summaries</li>
        </ul>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-xs">
            Next.js API Routes
          </span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-xs">
            LangChain
          </span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-xs">
            OpenAI GPT-3.5
          </span>
          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 rounded-full text-xs">
            TypeScript
          </span>
        </div>
      </div>
    </div>
  )
} 