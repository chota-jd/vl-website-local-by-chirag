import BlogView from '@/components/BlogView'
import { getBlogPosts } from '@/lib/sanity/utils'

// Enable ISR: revalidate every minute (60 seconds)
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogView posts={posts} />
}

