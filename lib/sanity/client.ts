import { createClient } from '@sanity/client'
import { config } from './config'

// Client with CDN for general use (images, etc.)
export const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn: config.useCdn,
  // No token needed for public reads
})

// Client without CDN for blog queries to ensure fresh data
// This bypasses Sanity's CDN cache for Firebase Hosting compatibility
export const blogClient = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn: false, // Always bypass CDN for blog data
  // No token needed for public reads
})
