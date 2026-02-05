## AI Deep-Dive Blog Flow (Short)

- **Trigger**
  - Admin clicks `Generate New Blog` in `Blog Admin`.

- **Sanity + Auth Checks**
  - Verify `SANITY_WRITE_TOKEN` and connection.
  - Resolve **default author** from Sanity.

- **Content Generation**
  - Call `/api/blog/generate` → `generateContent` → `generateBlogContent`.
  - Run **CONTENT IDEAS PROMPT** → 5 ideas → choose strongest.
  - Build **Input Topic**: `Input Topic: [CATCHY_HEADLINE] - [CORE_INSIGHTS]`.
  - Run **BLOG PROMPT** to create the deep-dive article JSON:
    - `title`, `excerpt`, `body (markdown)`, `tags`, `inputTopic`, `imageConcept`.

- **Post Processing**
  - Convert markdown → PortableText.
  - Count words → compute `readTime`.
  - Create slug from title.

- **Image Generation**
  - Build image prompt using:
    - Chosen **catchy headline** from `inputTopic`.
    - Deep-dive `title`, `excerpt`, `imageConcept`.
  - Generate image with Gemini image model (fallback Unsplash if needed).
  - Upload image to Sanity → get `imageAssetId`, `imageUrl`.

- **Pending Post Save**
  - Save everything to **pending blogs store** (not directly to Sanity post):
    - Text, PortableText, tags, `readTime`, `imageAssetId`, `imageUrl`, author, slug.
  - Return success to UI; pending list refreshes.

- **Human Review**
  - Admin reviews content + image in `Blog Admin`.
  - Approve as Draft / Approve & Publish / Reject.

---

## Flow Diagram

```mermaid
flowchart TD
  A[Admin clicks "Generate New Blog"] --> B[API /api/blog/generate]
  B --> C[Check Sanity token & default author]
  C --> D[Run CONTENT IDEAS PROMPT\n→ 5 ideas → pick strongest]
  D --> E[Build Input Topic:\nInput Topic: [CATCHY] - [CORE]]
  E --> F[Run BLOG PROMPT\n→ Deep-dive article JSON]
  F --> G[Markdown → PortableText\n+ read time + slug]
  F --> H[Build image prompt\nusing catchy headline + article]
  H --> I[Gemini image gen\n(+ Unsplash fallback)]
  I --> J[Upload image to Sanity\nimageAssetId + imageUrl]
  G --> K[Save as Pending Blog\n(text + image refs)]
  J --> K
  K --> L[Admin reviews in Blog Admin\nApprove / Publish / Reject]
```

