'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { blogApi } from '@/lib/api'

interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string | null
  created_at: string
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi.getPosts(page, pageSize)
        setPosts(response.data.posts)
        setTotal(response.data.total)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page])

  if (loading) {
    return <div className="text-center py-12">Загрузка...</div>
  }

  if (posts.length === 0) {
    return <div className="text-center py-12 text-gray-600">Статьи пока не опубликованы</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-secondary mb-2">{post.title}</h2>
              {post.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              )}
              <div className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {total > pageSize && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Предыдущая
          </button>
          <span className="px-4 py-2">
            Страница {page} из {Math.ceil(total / pageSize)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / pageSize)}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Следующая
          </button>
        </div>
      )}
    </div>
  )
}

