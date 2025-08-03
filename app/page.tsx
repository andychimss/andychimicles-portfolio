import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
        Andy Chimicles
      </h1>
      <h2 className="mb-8 text-lg font-medium tracking-tighter text-neutral-600 dark:text-neutral-400">
        Product Management
      </h2>
      <div className="mb-4">
        <a 
          href="https://www.linkedin.com/in/andychimicles/" 
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <p className="mb-4">
        {`Built products 0→1→IPO and led full-funnel growth from onboarding to monetization. Experience in SaaS, consumer, music, and education. Thrives in fast-paced teams, experimentation, and AI-driven prototyping.`}
      </p>
      
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Recent Vibecoded Tinkerings</h2>
        <div className="space-y-4">
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Palettry</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
              Palettry learns your taste preferences and gives you personalized menu recommendations at any restaurant.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                AI Agents
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Mobile App
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                React
              </span>
            </div>
            <div className="mt-3">
              <a 
                href="https://palettry.vercel.app/" 
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </div>
          </div>
          
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">AI Travel Planner Demo</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
              Built using Cursor as an AI PM learning coach to master hands-on concepts like RAG, agents, and evaluation systems. Features multi-agent architecture with specialized budgeting, itinerary, and summary agents. <a href="https://www.linkedin.com/feed/update/urn:li:activity:7356449919487893504/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">More on LinkedIn →</a>
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
          
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Math Game, Vibecoded with My 6 year old</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
              Educational math game where players save animals from a tree by solving addition problems. Features 8-bit Duck Hunt style graphics, multiple animal characters, smooth animations, and audio feedback for an engaging learning experience.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Educational Game
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                HTML5 Canvas
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                React
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                TypeScript
              </span>
            </div>
            <div className="mt-3">
              <a 
                href="/apps/mathrescue" 
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View Project →
              </a>
            </div>
          </div>
          
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">AdTune Dashboard</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
              Replace generic Spotify audio ads with hyper-targeted, high-performing jingles. Leverages new <a href="https://arxiv.org/abs/2503.01183" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">DiffRhythm</a> model's innovations: 10x faster and cheaper song generation, fine-tuned lyric control, and one-shot lyrics+music generation.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Music Generation
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                AI Research
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Streamlit
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Audio Processing
              </span>
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400">
                Prototype Design
              </span>
            </div>
            <div className="mt-3">
              <a 
                href="/apps/adtunedashboard" 
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
