import { promises as fs } from 'fs'
import path from 'path'

export interface PendingBlogPost {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  body: string // Markdown content
  bodyPortableText: any[] // PortableText content
  tags?: string[]
  readTime: string
  authorId: string
  imageAssetId?: string
  imageUrl?: string
  createdAt: string
  publishStatus?: 'draft' | 'published'
}

const PENDING_BLOGS_FILE = path.join(process.cwd(), 'data', 'pending-blogs.json')

/**
 * Ensure the data directory exists
 */
async function ensureDataDirectory(): Promise<void> {
  const dataDir = path.dirname(PENDING_BLOGS_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

/**
 * Read all pending blog posts
 */
export async function getPendingBlogPosts(): Promise<PendingBlogPost[]> {
  try {
    await ensureDataDirectory()
    const fileContent = await fs.readFile(PENDING_BLOGS_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // File doesn't exist yet, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    console.error('Error reading pending blogs:', error)
    return []
  }
}

/**
 * Get a specific pending blog post by ID
 */
export async function getPendingBlogPost(id: string): Promise<PendingBlogPost | null> {
  const posts = await getPendingBlogPosts()
  return posts.find(post => post.id === id) || null
}

/**
 * Add a new pending blog post
 */
export async function addPendingBlogPost(post: Omit<PendingBlogPost, 'id' | 'createdAt'>): Promise<PendingBlogPost> {
  await ensureDataDirectory()
  
  const posts = await getPendingBlogPosts()
  const newPost: PendingBlogPost = {
    ...post,
    id: `pending-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  }
  
  posts.push(newPost)
  await fs.writeFile(PENDING_BLOGS_FILE, JSON.stringify(posts, null, 2), 'utf-8')
  
  return newPost
}

/**
 * Remove a pending blog post by ID
 */
export async function removePendingBlogPost(id: string): Promise<boolean> {
  await ensureDataDirectory()
  
  const posts = await getPendingBlogPosts()
  const filteredPosts = posts.filter(post => post.id !== id)
  
  if (filteredPosts.length === posts.length) {
    return false // Post not found
  }
  
  await fs.writeFile(PENDING_BLOGS_FILE, JSON.stringify(filteredPosts, null, 2), 'utf-8')
  return true
}
