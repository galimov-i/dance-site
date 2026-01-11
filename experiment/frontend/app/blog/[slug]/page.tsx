'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import BlogPost from '@/components/BlogPost'
import { blogApi } from '@/lib/api'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogApi.getPost(slug)
        setPost(response.data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Статья не найдена</h1>
          <a href="/blog" className="text-primary hover:underline">Вернуться к списку статей</a>
        </div>
      </div>
    )
  }

  return <BlogPost post={post} />
}

