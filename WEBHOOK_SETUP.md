# Sanity Webhook Setup for Instant Blog Updates on Firebase

This guide will help you set up Sanity webhooks to trigger instant revalidation when blog posts are created, updated, or deleted in Sanity Studio.

## ✅ What's Already Done

1. **Revalidation API Route**: `/app/api/blog/revalidate/route.ts` - Created and ready
2. **Blog Client Without CDN**: `lib/sanity/client.ts` - Configured to bypass Sanity CDN
3. **ISR Fallback**: Blog pages still have `revalidate = 60` as a safety net

## 🔧 Setup Steps

### Step 1: Set Environment Variable

Add the secret token to your Firebase environment:

**For Firebase Functions:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `versionlabs-official`
3. Go to **Functions** > **Configuration** > **Environment Variables**
4. Click **Add variable**
5. **Name**: `SANITY_REVALIDATE_SECRET`
6. **Value**: Generate a secure random string (e.g., run `openssl rand -base64 32` in terminal)
7. Click **Save**

**For Local Development (.env.local):**
```bash
SANITY_REVALIDATE_SECRET=your-secret-token-here
```

**Important**: Use the **same secret value** in both Sanity webhook configuration (Step 2) and your environment variable.

### Step 2: Configure Sanity Webhook

1. **Go to Sanity Management Console**
   - Visit: https://sanity.io/manage
   - Select your project (`jh5avta0`)

2. **Navigate to Webhooks**
   - Go to **API** > **Webhooks**
   - Click **Create webhook**

3. **Configure Webhook Settings**

   **Name**: `Blog Revalidation - Develop` (or `Blog Revalidation - Production`)
   
   **URL**: 
   - **Develop Channel**: `https://versionlabs-official--develop-mpnzk56p.web.app/api/blog/revalidate`
   - **Production**: `https://versionlabs-official.web.app/api/blog/revalidate`
   
   **Important**: Make sure to use the correct URL for your deployment channel. 
   The webhook will call this endpoint whenever a blog post is created, updated, or deleted.
   
   **Dataset**: `production`
   
   **HTTP method**: `POST`
   
   **API version**: `v2021-06-07` (or latest available)
   
   **Trigger on**: Select all:
   - ✅ Create
   - ✅ Update  
   - ✅ Delete
   
   **Filter**: 
   ```
   _type == "post"
   ```
   This ensures the webhook only fires for blog posts.
   
   **Projection** (recommended - reduces payload size):
   ```json
   {
     "_type": _type,
     "_id": _id,
     "slug": slug
   }
   ```
   **Note**: The `slug` field in the projection sends the full slug object (e.g., `{ "current": "blog-post-slug" }`). 
   The revalidation API route is configured to extract `slug.current` from this structure automatically.
   
   **HTTP Headers** (for security):
   - **Key**: `x-sanity-secret`
   - **Value**: `your-secret-token-here` (same value as `SANITY_REVALIDATE_SECRET`)

4. **Save the Webhook**

### Step 3: Deploy Your Changes

After setting the environment variable, redeploy:

```bash
yarn build
yarn deploy:develop
```

**Note**: If you set the environment variable via Firebase Console, you may need to redeploy functions for it to take effect.

### Step 4: Test the Webhook

**Manual Test (GET request):**

Visit in your browser:
```
https://versionlabs-official--develop-mpnzk56p.web.app/api/blog/revalidate?secret=your-secret-token
```

You should see:
```json
{
  "revalidated": true,
  "now": 1234567890,
  "message": "All blog pages revalidated successfully (manual trigger)"
}
```

**Test via Sanity Studio:**

1. Create a test blog post in Sanity Studio
2. Publish it
3. Check Firebase function logs to see the webhook being called
4. Visit your blog page - the new post should appear **immediately**

**Test Deletion:**

1. Delete a blog post in Sanity Studio
2. The webhook should fire automatically
3. Visit your blog page - the deleted post should disappear **immediately**

## 🔍 How It Works

1. **Content Change in Sanity**: You create/update/delete a blog post
2. **Sanity Sends Webhook**: Sanity automatically calls `/api/blog/revalidate` with the webhook payload
3. **Payload Processing**: The API route extracts `_type`, `_id`, and `slug.current` from the webhook payload
4. **Revalidation**: The API route calls `revalidatePath('/blog')` and `revalidatePath('/blog/[slug]')` to invalidate the cache
5. **Cache Invalidation**: Next.js invalidates the cached pages on Firebase
6. **Page Regeneration**: On the next request, pages regenerate with fresh data from Sanity (via `blogClient` without CDN)
7. **Immediate Update**: Users see the changes **instantly** (no need to wait for the 60-second ISR window)

## 🛠️ Troubleshooting

### Webhook Not Firing

- ✅ Check webhook is enabled in Sanity dashboard
- ✅ Verify filter is correct: `_type == "post"`
- ✅ Check webhook URL is correct (no typos)
- ✅ Ensure dataset matches (`production`)

### 401 Unauthorized Error

- ✅ Verify `SANITY_REVALIDATE_SECRET` is set in Firebase environment variables
- ✅ Check the secret in webhook headers matches the environment variable
- ✅ Redeploy Firebase functions after adding environment variables

### Pages Not Updating

- ✅ Check Firebase function logs for errors
- ✅ Verify `revalidatePath` is being called (check logs)
- ✅ Ensure you're using `blogClient` (not CDN-enabled client) - ✅ Already configured
- ✅ Try manual revalidation: `GET /api/blog/revalidate?secret=your-secret`
- ✅ **Check webhook payload format**: The revalidation API expects the projection format `{ "_type": _type, "_id": _id, "slug": slug }`. 
   Verify your webhook projection matches this format.
- ✅ **Browser cache**: After revalidation, try a hard refresh (Cmd+Shift+R or Ctrl+Shift+R) to bypass browser cache
- ✅ **CDN cache**: Firebase Hosting may cache static files. Pages regenerate on the next request after revalidation.

### Webhook Returns 500 Error

- ✅ Check Firebase function logs for detailed error messages
- ✅ Verify Sanity client configuration is correct
- ✅ Ensure `blogClient` is properly exported from `lib/sanity/client.ts`

## 📊 Multiple Environments

If you have multiple deployment channels, create separate webhooks:

1. **Develop Channel**: 
   - URL: `https://versionlabs-official--develop-mpnzk56p.web.app/api/blog/revalidate`
   - Name: `Blog Revalidation - Develop`

2. **Production**: 
   - URL: `https://versionlabs-official.web.app/api/blog/revalidate`
   - Name: `Blog Revalidation - Production`

You can use the same secret token for both, or different ones for better security.

## 🔒 Security Best Practices

1. **Always use a secret token** - Never leave `SANITY_REVALIDATE_SECRET` empty in production
2. **Use HTTPS** - Webhooks should only use HTTPS URLs
3. **Rotate secrets periodically** - Change your secret token every few months
4. **Monitor webhook calls** - Check Firebase logs regularly for suspicious activity

## 🎯 Expected Behavior

- **Create Post**: Appears on site within **seconds** (not 60 seconds)
- **Update Post**: Changes reflect **immediately**
- **Delete Post**: Disappears from site **instantly**

## 📝 Fallback Behavior

Even if the webhook fails or isn't set up:
- ISR will still revalidate every 60 seconds (`revalidate = 60`)
- Changes will appear, just with a delay
- The webhook makes it instant, but ISR ensures eventual consistency

---

**Last Updated**: January 2025  
**Next.js Version**: 15.1.0  
**Firebase Hosting**: Frameworks Backend (Cloud Run)
