# Portfolio Blog Starter

This is a porfolio site template complete with a blog. Includes:

- MDX and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS Feed
- Dynamic OG images
- Syntax highlighting
- Tailwind v4
- Vercel Speed Insights / Web Analytics
- Geist font

## Demo

https://portfolio-blog-starter.vercel.app

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/blog&project-name=blog&repository-name=blog)

### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/solutions/blog blog
```

Then, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/templates) ([Documentation](https://nextjs.org/docs/app/building-your-application/deploying)).

## AI Travel Planner Setup

This portfolio includes an integrated AI-powered travel planner. To enable it:

1. **Get an OpenAI API Key**: 
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your OpenAI API key
   ```

3. **Visit the travel planner**:
   - Development: `http://localhost:3000/apps/vaca-planner`
   - Production: `https://andychimicles.vercel.app/apps/vaca-planner`

The travel planner uses a multi-agent AI system to create personalized vacation plans based on budget, trip length, and preferred vibe.

## Architecture & Decisions

This portfolio is built as a **hybrid portfolio-blog site with integrated mini-applications**, designed for rapid prototyping and showcasing diverse technical capabilities. The architecture prioritizes developer experience, SEO optimization, and scalable component patterns.

### Tech Stack

**Core Framework**
- **Next.js 14+ (App Router)**: Modern React framework with app directory for improved performance, better developer experience, and built-in optimizations
- **TypeScript 5.3**: Type safety with flexible configuration (strict mode disabled for prototyping speed)
- **Tailwind CSS v4 Alpha**: Latest Tailwind features for rapid UI development
- **React 18**: Latest React features including concurrent rendering

**State Management & AI**
- **Zustand 5.0**: Lightweight state management for game logic and complex UI state
- **LangChain + OpenAI**: Multi-agent AI systems with evaluation pipelines
- **Next.js API Routes**: Serverless backend for AI integrations

**Development & Deployment**
- **Vercel**: Deployment platform with built-in analytics and speed insights
- **Geist Font**: Vercel's optimized font family for performance
- **PostCSS**: CSS processing for Tailwind and modern CSS features

### Project Structure

```
app/
├── apps/                    # Self-contained mini-applications
│   ├── vaca-planner/       # AI travel planner with LangChain
│   ├── mathrescue/         # Canvas-based educational game
│   └── adtunedashboard/    # Music generation prototype
├── api/                    # Next.js API routes for backend logic
├── blog/                   # MDX-powered blog system
├── components/             # Shared UI components
└── (other Next.js files)   # Layout, SEO, and app configuration
```

### Key Architectural Decisions

**1. Multi-App Architecture**
- **Decision**: House multiple independent applications under `/apps/` instead of separate repositories
- **Rationale**: Enables rapid prototyping, shared UI components, and unified deployment while maintaining clear separation of concerns
- **Pattern**: Each app is self-contained with its own components, state, and business logic

**2. AI-First Integration Pattern**
- **Decision**: Use LangChain with multi-agent architecture for AI features
- **Implementation**: 
  - Budgeting Agent (GPT-3.5, temperature: 0.3)
  - Itinerary Agent (GPT-3.5, temperature: 0.7) 
  - Summary Agent (GPT-3.5, temperature: 0.7)
- **Rationale**: Demonstrates modern AI patterns with evaluation systems and agent orchestration

**3. State Management Strategy**
- **Decision**: Zustand for complex UI state, React state for simple cases
- **Pattern**: Store structure with subscriptions and middleware for game logic
- **Example**: `useMathGame` store handles game state, animations, and score tracking

**4. SEO & Performance Optimization**
- **Built-in Features**:
  - Dynamic sitemap generation from blog posts
  - Open Graph image generation
  - RSS feed automation
  - Robots.txt configuration
  - Vercel Analytics integration
- **Rationale**: Portfolio sites need maximum discoverability

**5. Component Design System**
- **Pattern**: Radix UI primitives with Tailwind styling
- **Structure**: `/ui/` components following shadcn/ui conventions
- **Approach**: Class Variance Authority (CVA) for component variants

### Development Patterns

**Canvas Game Development**
- HTML5 Canvas with React integration
- Custom animation loops with `requestAnimationFrame`
- Zustand for complex game state management
- Audio system with multiple sound effects

**AI Pipeline Architecture**
```typescript
// Multi-agent pipeline with evaluation
const pipeline = RunnableSequence.from([
  budgetingPrompt → budgetingAgent,
  itineraryPrompt → itineraryAgent,
  summaryPrompt → summaryAgent
])
```

**Blog System**
- MDX support with `next-mdx-remote`
- File-based routing with metadata
- Automatic post sorting and formatting
- Syntax highlighting with `sugar-high`

### Environment Configuration

**Required Environment Variables**
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

**Development Setup**
```bash
npm install
npm run dev  # Next.js development server
npm run build # Production build
```

### Future Development Guidelines

**Adding New Apps**
1. Create directory under `/apps/[app-name]/`
2. Include `page.tsx` as entry point
3. Add navigation link in main portfolio (`app/page.tsx`)
4. Create self-contained components in app directory

**AI Integration Patterns**
- Use LangChain for complex workflows
- Implement evaluation functions for output validation
- Structure as multi-agent systems when appropriate
- Include error handling for API failures

**State Management**
- Use Zustand for complex state with subscriptions
- Use React state for simple component state
- Structure stores with clear action patterns
- Include TypeScript interfaces for state shape

**Performance Considerations**
- Leverage Next.js Image optimization
- Use dynamic imports for large components
- Implement proper loading states for AI operations
- Monitor bundle size with Vercel analytics

This architecture enables rapid development of diverse applications while maintaining code quality, performance, and maintainability for both current and future development efforts.
