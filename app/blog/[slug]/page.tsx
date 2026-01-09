import { notFound } from 'next/navigation'
import BlogPostView from '@/components/BlogPostView'
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/sanity/utils'

// Enable ISR: revalidate every minute (60 seconds)
export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPostView post={post} />
}

