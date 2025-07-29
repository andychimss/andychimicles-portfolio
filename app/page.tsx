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
        <BlogPosts />
      </div>
    </section>
  )
}
