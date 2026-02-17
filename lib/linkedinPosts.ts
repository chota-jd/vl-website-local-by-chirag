import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase/config'

export interface LinkedInPostItem {
  content: string
  hook?: string
}

export interface LinkedInPostBatch {
  id: string
  productName: string
  productUrl: string
  posts: LinkedInPostItem[]
  createdAt: string
}

const COLLECTION_NAME = 'linkedinPosts'

function parseCreatedAt(data: { createdAt?: unknown }): string {
  const raw = data.createdAt
  if (raw && typeof (raw as { toDate?: () => Date }).toDate === 'function') {
    return (raw as { toDate: () => Date }).toDate().toISOString()
  }
  if (raw instanceof Timestamp) {
    return raw.toDate().toISOString()
  }
  if (typeof raw === 'string') {
    return raw
  }
  return new Date().toISOString()
}

/**
 * List all saved LinkedIn post batches (newest first)
 */
export async function getLinkedInPostBatches(): Promise<LinkedInPostBatch[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const batches: LinkedInPostBatch[] = []
    snapshot.forEach((docSnap) => {
      const data = docSnap.data()
      batches.push({
        id: docSnap.id,
        productName: data.productName ?? '',
        productUrl: data.productUrl ?? '',
        posts: Array.isArray(data.posts) ? data.posts : [],
        createdAt: parseCreatedAt(data),
      })
    })
    return batches
  } catch (err) {
    console.error('Error reading LinkedIn posts from Firestore:', err)
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME))
      const batches: LinkedInPostBatch[] = []
      snapshot.forEach((docSnap) => {
        const data = docSnap.data()
        batches.push({
          id: docSnap.id,
          productName: data.productName ?? '',
          productUrl: data.productUrl ?? '',
          posts: Array.isArray(data.posts) ? data.posts : [],
          createdAt: parseCreatedAt(data),
        })
      })
      return batches.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (fallback) {
      console.error('Fallback read failed:', fallback)
      return []
    }
  }
}

/**
 * Save a new batch of LinkedIn posts to Firestore
 */
export async function addLinkedInPostBatch(
  payload: Omit<LinkedInPostBatch, 'id' | 'createdAt'>
): Promise<LinkedInPostBatch> {
  const createdAt = Timestamp.now()
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    productName: payload.productName,
    productUrl: payload.productUrl,
    posts: payload.posts,
    createdAt,
  })
  return {
    id: docRef.id,
    productName: payload.productName,
    productUrl: payload.productUrl,
    posts: payload.posts,
    createdAt: createdAt.toDate().toISOString(),
  }
}
