import DOMPurify from 'isomorphic-dompurify'

interface BlogPostProps {
  post: {
    id: number
    slug: string
    title: string
    content: string
    excerpt: string | null
    created_at: string
  }
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-secondary mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-8">
          {new Date(post.created_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </div>
    </article>
  )
}

