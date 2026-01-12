import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * API route for on-demand revalidation via Sanity webhooks
 * 
 * This route should be called by Sanity when blog posts are:
 * - Created
 * - Updated
 * - Deleted
 * 
 * Set up webhook in Sanity Studio:
 * 1. Go to https://sanity.io/manage
 * 2. Select your project
 * 3. Go to API > Webhooks
 * 4. Create new webhook
 * 5. URL: https://your-domain.com/api/blog/revalidate
 * 6. Dataset: production
 * 7. Trigger on: Create, Update, Delete
 * 8. Filter: _type == "post"
 * 9. HTTP method: POST
 * 10. Secret: Set SANITY_REVALIDATE_SECRET env variable
 */

export async function POST(request: NextRequest) {
  try {
    // Verify secret token to prevent unauthorized access
    const secret = request.headers.get('x-sanity-secret') || request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      )
    }

    // Parse webhook payload
    const body = await request.json().catch(() => ({}))
    
    // Log the full payload for debugging
    console.log('[Revalidate] Full webhook payload:', JSON.stringify(body, null, 2))
    
    // Extract document info from Sanity webhook payload
    // Based on your webhook projection: { "_type": _type, "_id": _id, "slug": slug }
    // The payload format will be: { "_type": "post", "_id": "...", "slug": { "current": "..." } }
    const webhookBody = body.body || body
    
    // Extract _type (should be "post")
    const documentType = webhookBody._type || body._type
    
    // Extract _id
    const documentId = webhookBody._id || body._id
    
    // Extract slug - the projection sends the full slug object, so we need to access .current
    // Handle both cases: slug object with .current property, or direct string
    let slug: string | undefined
    if (webhookBody.slug) {
      slug = typeof webhookBody.slug === 'string' 
        ? webhookBody.slug 
        : webhookBody.slug.current
    } else if (body.slug) {
      slug = typeof body.slug === 'string' 
        ? body.slug 
        : body.slug.current
    }
    
    console.log('[Revalidate] Extracted values:', { documentType, documentId, slug })

    // Only revalidate if it's a blog post
    if (documentType !== 'post') {
      return NextResponse.json(
        { message: 'Not a blog post, skipping revalidation', documentType },
        { status: 200 }
      )
    }

    console.log(`[Revalidate] Processing webhook for post: ${documentId}, slug: ${slug}`)

    // Revalidate the blog listing page - use 'page' type for explicit page revalidation
    revalidatePath('/blog', 'page')
    // Also revalidate without type to ensure all related paths are invalidated
    revalidatePath('/blog')
    console.log('[Revalidate] Revalidated /blog')

    // Revalidate the specific blog post page if slug is available
    if (slug) {
      const blogPostPath = `/blog/${slug}`
      revalidatePath(blogPostPath, 'page')
      revalidatePath(blogPostPath)
      console.log(`[Revalidate] Revalidated ${blogPostPath}`)
    } else {
      console.warn('[Revalidate] No slug provided, skipping individual post revalidation')
    }

    // Note: revalidatePath invalidates the cache, but pages regenerate on next request
    // With Firebase Hosting + Next.js ISR, the pages will be regenerated when users visit them
    // If content still doesn't update, check:
    // 1. Browser cache (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)
    // 2. CDN cache (Firebase Hosting may cache static files)
    // 3. Ensure the pages are using ISR (revalidate = 60) not static generation

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: [
        '/blog',
        ...(slug ? [`/blog/${slug}`] : [])
      ],
      message: 'Blog pages revalidated successfully'
    })
  } catch (error) {
    console.error('[Revalidate] Error:', error)
    return NextResponse.json(
      {
        error: 'Error revalidating',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Allow GET requests for manual testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json(
      { error: 'Invalid secret token' },
      { status: 401 }
    )
  }

  try {
    // Revalidate all blog pages
    revalidatePath('/blog')
    revalidatePath('/blog', 'page')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'All blog pages revalidated successfully (manual trigger)'
    })
  } catch (error) {
    console.error('[Revalidate] Error:', error)
    return NextResponse.json(
      {
        error: 'Error revalidating',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
