import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

/**
 * Extract meaningful content from a URL's HTML for context.
 * Uses meta tags and title; avoids heavy DOM parsing.
 */
function extractContentFromHtml(html: string): { title: string; description: string; snippet: string } {
  const safe = (s: string) => (s || '').trim().replace(/\s+/g, ' ').slice(0, 2000)

  let title = ''
  let description = ''

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (titleMatch) title = titleMatch[1].replace(/<[^>]+>/g, '').trim()

  const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
  if (ogTitleMatch) title = ogTitleMatch[1].trim() || title

  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
  if (descMatch) description = descMatch[1].trim()
  const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
  if (ogDescMatch) description = ogDescMatch[1].trim() || description

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  let snippet = ''
  if (bodyMatch) {
    const text = bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ')
    snippet = text.replace(/\s+/g, ' ').trim().slice(0, 1500)
  }

  return {
    title: safe(title),
    description: safe(description),
    snippet: safe(snippet),
  }
}

export interface LinkedInPostOption {
  content: string
  hook?: string
}

/**
 * POST /api/linkedin/generate
 * Body: { productName: string, productUrl: string }
 * Returns: { success: true, posts: LinkedInPostOption[] } (3–4 variations)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const productName = typeof body.productName === 'string' ? body.productName.trim() : ''
    const productUrl = typeof body.productUrl === 'string' ? body.productUrl.trim() : ''

    if (!productName || !productUrl) {
      return NextResponse.json(
        { error: 'Both productName and productUrl are required.' },
        { status: 400 }
      )
    }

    let urlParsed: URL
    try {
      urlParsed = new URL(productUrl)
    } catch {
      return NextResponse.json(
        { error: 'Invalid product URL.' },
        { status: 400 }
      )
    }

    if (!['http:', 'https:'].includes(urlParsed.protocol)) {
      return NextResponse.json(
        { error: 'URL must be http or https.' },
        { status: 400 }
      )
    }

    let html = ''
    try {
      const res = await fetch(urlParsed.toString(), {
        headers: { 'User-Agent': 'VersionLabs-ContentBot/1.0' },
        signal: AbortSignal.timeout(15000),
      })
      if (!res.ok) {
        return NextResponse.json(
          { error: `Could not fetch URL (${res.status}). The page may be private or blocked.` },
          { status: 400 }
        )
      }
      html = await res.text()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return NextResponse.json(
        { error: `Failed to fetch URL: ${message}` },
        { status: 400 }
      )
    }

    const extracted = extractContentFromHtml(html)
    const context = [
      extracted.title && `Page title: ${extracted.title}`,
      extracted.description && `Meta description: ${extracted.description}`,
      extracted.snippet && `Page content snippet: ${extracted.snippet}`,
    ]
      .filter(Boolean)
      .join('\n\n')

    if (!process.env.API_KEY) {
      return NextResponse.json(
        { error: 'API_KEY is not configured. Cannot generate content.' },
        { status: 500 }
      )
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY })
    const prompt = `You are a professional LinkedIn content writer for a B2B / government tech company.

Product name: ${productName}
Product URL: ${productUrl}

Content analyzed from the product page:
${context || '(No content could be extracted from the URL. Use the product name and URL only.)'}

Generate exactly 4 different LinkedIn post options to promote this product. Each post should:
- Be suitable for LinkedIn (professional, engaging, 1–3 short paragraphs).
- Be based on the actual content from the URL above (features, benefits, use cases).
- Vary in tone: one more benefit-focused, one more story/hook, one more stats/outcomes, one more call-to-action.
- Include a short hook or opening line when relevant.
- Stay under ~1,300 characters per post so they fit LinkedIn comfortably.

Respond with a valid JSON array of 4 objects. Each object must have:
- "content": string (the full post text)
- "hook": string (optional, the first line or hook used)

Example format:
[
  { "content": "Full post text here...", "hook": "Opening line" },
  { "content": "Second post...", "hook": "..." },
  ...
]

Return only the JSON array, no other text or markdown.`

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        temperature: 0.8,
        topP: 0.9,
      },
    })

    const responseText = (response.text || '').trim()
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    const rawPosts = jsonMatch ? JSON.parse(jsonMatch[0]) : []

    const posts: LinkedInPostOption[] = Array.isArray(rawPosts)
      ? rawPosts
          .slice(0, 4)
          .map((p: { content?: string; hook?: string }) => ({
            content: typeof p?.content === 'string' ? p.content : String(p?.content || ''),
            hook: typeof p?.hook === 'string' ? p.hook : undefined,
          }))
          .filter((p: LinkedInPostOption) => p.content.length > 0)
      : []

    if (posts.length === 0) {
      return NextResponse.json(
        { error: 'Could not generate any post variations. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, posts })
  } catch (err) {
    console.error('LinkedIn generate error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to generate LinkedIn content.' },
      { status: 500 }
    )
  }
}
