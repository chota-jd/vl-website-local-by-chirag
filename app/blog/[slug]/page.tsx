import { notFound } from 'next/navigation'
import BlogPostView from '@/views/BlogPostView'
import { BLOG_POSTS } from '@/data/blogPosts'

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.id,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.id === params.slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostView post={post} />
}

