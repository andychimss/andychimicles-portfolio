import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Andy Chimicles
      </h1>
      <p className="mb-4">
        {`Built products 0→1→IPO and led full-funnel growth from onboarding to monetization. Experience in SaaS, consumer, music, and education. Thrives in fast-paced teams, experimentation, and AI-driven prototyping.`}
      </p>
      
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Projects</h2>
        <div className="space-y-4">
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Travel Planner Demo</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
              Multi-agent AI system with specialized budgeting, itinerary, and summary agents. Features prompt chaining, structured evaluation pipelines, and dynamic output validation for personalized travel planning at scale.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Multi-Agent Systems
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Prompt Engineering
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                LangChain Orchestration
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                AI Agent Evaluation
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                OpenAI GPT-4
              </span>
            </div>
            <div className="mt-3">
              <a 
                href="/apps/vaca-planner" 
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
