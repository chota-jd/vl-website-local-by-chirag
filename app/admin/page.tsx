'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, FileText, Copy, Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { LinkedInPostBatch, LinkedInPostItem } from '@/lib/linkedinPosts'

const ADMIN_PASSWORD = 'vl@2025'
const ADMIN_AUTH_KEY = 'admin-auth'
const ADMIN_USER_NAME_KEY = 'admin-user-name'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [enteredName, setEnteredName] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [userName, setUserName] = useState('')

  const [batches, setBatches] = useState<LinkedInPostBatch[]>([])
  const [loadingBatches, setLoadingBatches] = useState(false)
  const [showLinkedInForm, setShowLinkedInForm] = useState(false)
  const [productName, setProductName] = useState('')
  const [productUrl, setProductUrl] = useState('')
  const [generating, setGenerating] = useState(false)
  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPostItem[]>([])
  const [generateError, setGenerateError] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [activeTabBatchId, setActiveTabBatchId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem(ADMIN_AUTH_KEY) : null
      const name = typeof window !== 'undefined' ? window.localStorage.getItem(ADMIN_USER_NAME_KEY) : null
      if (stored === 'authenticated') {
        setIsAuthenticated(true)
        setShowLoginDialog(false)
        setUserName(name || '')
      } else {
        setShowLoginDialog(true)
      }
    } catch {
      setShowLoginDialog(true)
    } finally {
      setCheckingAuth(false)
    }
  }, [])

  const fetchBatches = async () => {
    setLoadingBatches(true)
    try {
      const res = await fetch('/api/linkedin/list')
      const data = await res.json()
      if (data.success && Array.isArray(data.batches)) {
        setBatches(data.batches)
      }
    } finally {
      setLoadingBatches(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchBatches()
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    const name = enteredName.trim()
    if (!name) {
      setLoginError('Name is required.')
      return
    }
    if (!enteredPassword.trim()) {
      setLoginError('Password is required.')
      return
    }
    if (enteredPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowLoginDialog(false)
      setLoginError('')
      setUserName(name)
      try {
        window.localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated')
        window.localStorage.setItem(ADMIN_USER_NAME_KEY, name)
      } catch {}
    } else {
      setLoginError('Incorrect password. Please try again.')
      setEnteredPassword('')
    }
  }

  const handleGenerateLinkedIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productName.trim() || !productUrl.trim()) {
      setGenerateError('Please fill in both Product name and Product URL.')
      return
    }
    setGenerateError(null)
    setGenerating(true)
    setLinkedInPosts([])
    try {
      const res = await fetch('/api/linkedin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productName.trim(),
          productUrl: productUrl.trim(),
        }),
      })
      const data = await res.json()
      if (res.ok && data.success && Array.isArray(data.posts)) {
        setLinkedInPosts(data.posts)
        const saveRes = await fetch('/api/linkedin/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: productName.trim(),
            productUrl: productUrl.trim(),
            posts: data.posts,
          }),
        })
        if (saveRes.ok) {
          await fetchBatches()
        }
      } else {
        setGenerateError(data?.error || 'Failed to generate content. Please try again.')
      }
    } catch (err) {
      setGenerateError('Network error. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const copyPost = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 3000)
    })
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    } catch {
      return iso
    }
  }

  const renderPostCard = (post: LinkedInPostItem, postKey: string) => (
    <Card key={postKey} className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        {post.hook && (
          <p className="text-slate-200 font-bold text-3xl mb-6">{post.hook}</p>
        )}
        <p className="text-slate-200 text-sm whitespace-pre-wrap mb-3">{post.content}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="secondary"
            className="flex items-center gap-2 py-2 px-4 text-xs"
            onClick={() => copyPost(post.content, postKey)}
          >
            {copiedKey === postKey ? <Check size={14} /> : <Copy size={14} />}
            {copiedKey === postKey ? 'Copied' : 'Copy'}
          </Button>
          {copiedKey === postKey && userName && (
            <span className="text-xs text-slate-400">
              Copied by {userName}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-obsidian-950 text-white pt-32 pb-8 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-black mb-8">Admin</h1>
          <p className="text-slate-400">Checking access…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-white pt-28 md:pt-32 pb-24 px-4 md:px-8">
      <Dialog open={showLoginDialog} onOpenChange={() => {}}>
        <DialogContent className="w-full min-w-[320px] max-w-[400px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <Lock size={24} className="text-accent" />
              Admin login
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="adminName">Name</Label>
              <Input
                id="adminName"
                type="text"
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
                placeholder="Your name (e.g. Chirag, Badal)"
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="text-sm text-red-400">{loginError}</p>}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isAuthenticated && (
        <div className="w-full max-w-full px-4 md:px-32">
          <h1 className="text-3xl md:text-4xl font-display font-black mb-2">Admin</h1>
          <p className="text-slate-400 mb-8">Content management tools</p>

          <Card className="bg-white/5 border-white/10 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-accent" size={28} />
                <h2 className="text-xl font-display font-bold">LinkedIn post</h2>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Generate 3–4 LinkedIn post variations from a product name and URL. Content is analyzed from the page and saved here.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setShowLinkedInForm(true)
                  setLinkedInPosts([])
                  setGenerateError(null)
                }}
              >
                Generate content for your post
              </Button>
            </CardContent>
          </Card>

          <div className="mb-6 flex flex-wrap gap-3">
            <Link href="/admin/blog">
              <Button variant="secondary">Blog Admin</Button>
            </Link>
            <a href="/studio" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="flex items-center gap-2">
                Open Sanity Studio
                <ExternalLink size={14} />
              </Button>
            </a>
          </div>

          <h2 className="text-xl font-display font-bold mb-4">Saved LinkedIn content</h2>
          {loadingBatches ? (
            <p className="text-slate-400 text-sm">Loading…</p>
          ) : batches.length === 0 ? (
            <p className="text-slate-500 text-sm">No saved content yet. Generate posts above to see them here.</p>
          ) : (
            <div className="w-full">
              <div className="flex flex-wrap gap-1 border-b border-white/10 mb-4">
                {batches.map((batch) => {
                  const isActive = (activeTabBatchId ?? batches[0]?.id) === batch.id
                  return (
                    <button
                      key={batch.id}
                      type="button"
                      onClick={() => setActiveTabBatchId(batch.id)}
                      className={`px-4 py-3 font-display font-bold text-sm uppercase tracking-ultra transition-colors border-b-2 -mb-px ${
                        isActive
                          ? 'text-accent border-accent bg-accent/5'
                          : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {batch.productName}
                    </button>
                  )
                })}
              </div>
              {batches.map((batch) => {
                const isActive = (activeTabBatchId ?? batches[0]?.id) === batch.id
                if (!isActive) return null
                return (
                  <Card key={batch.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <a
                        href={batch.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent text-sm hover:underline flex items-center gap-1 mb-2"
                      >
                        {batch.productUrl}
                        <ExternalLink size={14} />
                      </a>
                      <p className="text-slate-500 text-xs mb-6">{formatDate(batch.createdAt)}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {batch.posts.map((post, i) => renderPostCard(post, `${batch.id}-${i}`))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      )}

      <Dialog open={showLinkedInForm} onOpenChange={setShowLinkedInForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" onClose={() => setShowLinkedInForm(false)}>
          <DialogHeader>
            <DialogTitle>Generate LinkedIn content</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleGenerateLinkedIn} className="space-y-6">
            <div>
              <Label htmlFor="productName">Product name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. UnCloud"
                className="mt-2 bg-white/5 border-white/10"
                disabled={generating}
              />
            </div>
            <div>
              <Label htmlFor="productUrl">Product URL</Label>
              <Input
                id="productUrl"
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://example.com/product"
                className="mt-2 bg-white/5 border-white/10"
                disabled={generating}
              />
            </div>
            {generateError && <p className="text-sm text-red-400">{generateError}</p>}
            <Button type="submit" disabled={generating} className="w-full">
              {generating ? 'Analyzing URL & generating content…' : 'Generate 3–4 posts'}
            </Button>
          </form>

          {linkedInPosts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-lg font-display font-bold mb-4">Generated posts ({linkedInPosts.length}) — saved below</h3>
              <div className="space-y-4">
                {linkedInPosts.map((post, i) => renderPostCard(post, `modal-${i}`))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
