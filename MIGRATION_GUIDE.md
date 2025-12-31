# Next.js Migration Guide

## Overview
This project has been successfully migrated from a Vite + React SPA to a full Next.js application using the App Router.

## Project Structure Changes

### Old Structure (Vite)
```
/
├── App.tsx (main app with state-based routing)
├── index.tsx (entry point)
├── components/
├── views/
├── services/
└── vite.config.ts
```

### New Structure (Next.js)
```
/
├── app/
│   ├── layout.tsx (root layout with fonts)
│   ├── page.tsx (home page)
│   ├── globals.css (global styles)
│   ├── api/
│   │   └── chat/
│   │       └── route.ts (API route for chatbot)
│   ├── services/
│   ├── strategy/
│   ├── impact/
│   ├── press/
│   ├── portfolio/
│   ├── testimonials/
│   ├── solution-learning/
│   ├── solution-automation/
│   ├── solution-strategy/
│   ├── partnership/
│   ├── blog/
│   │   └── [slug]/
│   ├── intel/
│   ├── vl/
│   └── enquiry/
├── components/ (converted to use Next.js Link)
├── views/ (converted to use Next.js Link)
└── public/ (for static assets)
```

## Key Changes

### 1. Routing
- **Old**: Client-side state management with `setView()` function
- **New**: Next.js App Router with file-based routing
- **Mapping**:
  - `landing` → `/`
  - `services` → `/services`
  - `strategy` → `/strategy`
  - `impact` → `/impact`
  - `press` → `/press`
  - `portfolio` → `/portfolio`
  - `testimonials` → `/testimonials`
  - `solution-learning` → `/solution-learning`
  - `solution-automation` → `/solution-automation`
  - `solution-strategy` → `/solution-strategy`
  - `enquiry` → `/enquiry`
  - `partnership` → `/partnership`
  - `blog` → `/blog`
  - `blog-post` → `/blog/[slug]`
  - `intel` → `/intel`
  - `vl` → `/vl`

### 2. Components
All components have been updated to:
- Use `'use client'` directive where needed (for interactivity)
- Replace `setView()` calls with Next.js `Link` component
- Use `usePathname()` hook for active route detection
- Remove dependency on `ViewType` from App.tsx

### 3. Views
All views have been converted to:
- Remove `setView` prop
- Use `Link` from `next/link` for navigation
- Add `'use client'` directive
- Update imports to use `@/` alias

### 4. API Routes
- Chatbot service moved to `/app/api/chat/route.ts`
- Uses Next.js API route handlers
- Environment variables: `GEMINI_API_KEY` or `API_KEY`

### 5. Styling
- Tailwind CSS configured via `tailwind.config.js`
- Global styles in `app/globals.css`
- Fonts loaded via Next.js font optimization (Inter, Manrope)
- All custom styles preserved exactly

### 6. Environment Variables
Create a `.env.local` file:
```
GEMINI_API_KEY=your_api_key_here
```

## Installation & Running

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Runs on http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## File Mapping

| Old File | New Location | Notes |
|----------|--------------|-------|
| `App.tsx` | `app/page.tsx` | Home page content |
| `index.tsx` | `app/layout.tsx` | Root layout |
| `components/*` | `components/*` | Updated to use Link |
| `views/*` | `views/*` | Updated to use Link |
| `views/*` | `app/*/page.tsx` | Page routes |
| `services/geminiService.ts` | `app/api/chat/route.ts` | API route |
| `index.html` | `app/layout.tsx` | Metadata moved to layout |
| `vite.config.ts` | `next.config.js` | Next.js config |

## Preserved Features

✅ All design, layout, fonts, colors, spacing, animations
✅ All components and UI elements
✅ Responsive behavior
✅ Chatbot functionality (now via API route)
✅ All routing and navigation
✅ SEO metadata (via Next.js metadata API)

## Breaking Changes

1. **No more `setView()` function** - Use Next.js `Link` or `useRouter()`
2. **No more `ViewType` enum** - Use route paths directly
3. **Client components** - Components with interactivity need `'use client'`
4. **API calls** - Chatbot now uses `/api/chat` endpoint

## Notes

- All images and assets should be moved to `/public` folder
- Update any hardcoded image paths to use `/` prefix (e.g., `/images/logo.png`)
- The chatbot component now makes API calls to `/api/chat` instead of calling the service directly
- All animations and transitions are preserved
- Font loading is optimized via Next.js font system

