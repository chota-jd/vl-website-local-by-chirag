# VersionLabs - Next.js Project

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── api/                # API routes
│   └── [routes]/           # Page routes
├── components/             # React components
├── views/                  # Page view components
├── public/                 # Static assets
└── types.ts               # TypeScript types
```

## Key Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Server-side rendering
- ✅ API routes for chatbot
- ✅ Optimized font loading
- ✅ SEO-friendly metadata

## Routes

- `/` - Home page
- `/services` - Services overview
- `/strategy` - Strategic framework
- `/impact` - National impact
- `/press` - Press coverage
- `/portfolio` - Project portfolio
- `/testimonials` - Client testimonials
- `/solution-learning` - Learning solutions
- `/solution-automation` - Automation solutions
- `/solution-strategy` - Strategy solutions
- `/enquiry` - Contact form
- `/partnership` - Partnership info
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post detail
- `/intel` - Intel projects
- `/vl` - VersionLabs projects

## Development

The project uses:
- **Next.js 15** for the framework
- **React 19** for UI
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Google Gemini API** for chatbot

## Deployment

The project is ready to deploy on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

Make sure to set the `GEMINI_API_KEY` environment variable in your deployment platform.

