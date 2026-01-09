# Sanity Webhook Configuration Guide

This guide will help you configure the Sanity webhook to trigger instant blog revalidation on your Firebase-hosted site.

## ✅ Prerequisites

- ✅ Firebase Function deployed: `https://revalidateblog-detxk7y6rq-uc.a.run.app`
- ✅ Secret token: `4K0Tr4pyHrTegHuP87vBe3tVeEr6J2dCmhMX8AZVQdA=`
- ✅ Next.js API route: `/api/blog/revalidate`

## 📋 Step-by-Step Setup

### Step 1: Access Sanity Management Console

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project: **`jh5avta0`**

### Step 2: Navigate to Webhooks

1. In the left sidebar, click on **API**
2. Click on **Webhooks** (under API section)
3. Click the **Create webhook** button

### Step 3: Configure Webhook Settings

Fill in the following details:

#### Basic Information

- **Name**: `Blog Revalidation - Firebase Function`
  - (You can use any descriptive name)

#### Webhook URL

- **URL**: `https://revalidateblog-detxk7y6rq-uc.a.run.app`
  - This is your deployed Firebase Function URL

#### Dataset

- **Dataset**: `production`
  - Select the dataset where your blog posts are stored

#### HTTP Method

- **HTTP method**: `POST`
  - Select POST from the dropdown

#### API Version

- **API version**: `v2021-06-07` (or latest available)
  - Use the most recent API version

#### Triggers

Select when the webhook should fire:
- ✅ **Create** - When a new blog post is created
- ✅ **Update** - When an existing blog post is updated
- ✅ **Delete** - When a blog post is deleted

#### Filter

Add a filter to only trigger for blog posts:

```
_type == "post"
```

This ensures the webhook only fires for blog posts, not other content types.

#### Projection (Optional but Recommended)

Add a projection to reduce payload size:

```json
{
  "_type": _type,
  "_id": _id,
  "slug": slug
}
```

This sends only the necessary data in the webhook payload.

#### HTTP Headers

**Leave this section empty** - The secret token is handled by the Firebase Function's environment variables.

### Step 4: Save the Webhook

1. Review all settings
2. Click **Save** or **Create webhook**

## 🧪 Testing the Webhook

### Test 1: Create a Blog Post

1. Go to [Sanity Studio](https://your-studio-url.sanity.studio)
2. Create a new blog post
3. Fill in the required fields (title, content, etc.)
4. **Publish** the post
5. Check Firebase Function logs:
   ```bash
   firebase functions:log --only revalidateBlog
   ```
6. Visit your blog page: `https://versionlabs-official--develop-mpnzk56p.web.app/blog`
7. **Expected Result**: The new post should appear **immediately**

### Test 2: Update a Blog Post

1. In Sanity Studio, edit an existing blog post
2. Make a change (e.g., update the title)
3. **Publish** the changes
4. Visit the blog post page
5. **Expected Result**: Changes should appear **immediately**

### Test 3: Delete a Blog Post

1. In Sanity Studio, delete a blog post
2. Visit your blog listing page
3. **Expected Result**: The deleted post should disappear **immediately**

## 🔍 Verifying Webhook is Working

### Check Firebase Function Logs

```bash
firebase functions:log --only revalidateBlog
```

Look for entries like:
```
[INFO] Processing webhook for post: abc123, slug: my-blog-post
[INFO] Blog revalidation successful
```

### Check Sanity Webhook Status

1. Go back to Sanity Manage > API > Webhooks
2. Click on your webhook
3. Check the **Status** - should show as **Active**
4. View **Recent deliveries** to see webhook call history

### Manual Test (Optional)

You can manually test the Firebase Function:

```bash
curl -X POST https://revalidateblog-detxk7y6rq-uc.a.run.app \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "post",
    "_id": "test123",
    "slug": {
      "current": "test-post"
    }
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Blog revalidation triggered successfully",
  "nextjsResponse": {
    "revalidated": true,
    "paths": ["/blog", "/blog/test-post"]
  }
}
```

## 🛠️ Troubleshooting

### Webhook Not Firing

**Symptoms**: Changes in Sanity don't appear on the site

**Solutions**:
- ✅ Check webhook is **enabled** in Sanity dashboard
- ✅ Verify **filter** is correct: `_type == "post"`
- ✅ Check webhook **URL** is correct (no typos)
- ✅ Ensure **dataset** matches (`production`)
- ✅ Verify blog post is **published** (not just saved as draft)

### 500 Error from Firebase Function

**Symptoms**: Webhook fires but returns error

**Solutions**:
- ✅ Check Firebase Function logs for detailed error
- ✅ Verify `SANITY_REVALIDATE_SECRET` is set in Firebase Functions config
- ✅ Verify `NEXTJS_REVALIDATE_URL` is correct
- ✅ Test Next.js API route directly

### Changes Not Appearing on Site

**Symptoms**: Webhook fires successfully but site doesn't update

**Solutions**:
- ✅ Check Next.js API route is accessible
- ✅ Verify secret token matches in both places
- ✅ Check browser cache (try hard refresh: Cmd+Shift+R)
- ✅ Verify `blogClient` is being used (not CDN-enabled client)
- ✅ Check Next.js deployment is up to date

### Webhook Returns 401 Unauthorized

**Symptoms**: Firebase Function rejects the request

**Solutions**:
- ✅ Verify `SANITY_REVALIDATE_SECRET` environment variable is set
- ✅ Check the secret value matches what's configured
- ✅ Redeploy Firebase Function after setting environment variables

## 📊 Webhook Configuration Summary

| Setting | Value |
|---------|-------|
| **Name** | Blog Revalidation - Firebase Function |
| **URL** | `https://revalidateblog-detxk7y6rq-uc.a.run.app` |
| **Dataset** | `production` |
| **HTTP Method** | `POST` |
| **Triggers** | Create, Update, Delete |
| **Filter** | `_type == "post"` |
| **Projection** | `{ "_type": _type, "_id": _id, "slug": slug }` |
| **HTTP Headers** | (Empty - handled by Firebase Function) |

## 🔄 How It Works

1. **You create/update/delete** a blog post in Sanity Studio
2. **Sanity sends webhook** → `https://revalidateblog-detxk7y6rq-uc.a.run.app`
3. **Firebase Function receives** webhook and validates it's a blog post
4. **Firebase Function forwards** request to Next.js API route with secret header
5. **Next.js API route** calls `revalidatePath('/blog')` and `revalidatePath('/blog/[slug]')`
6. **Cache is invalidated** and pages regenerate with fresh data
7. **Users see changes** immediately on your site

## ✅ Success Indicators

You'll know it's working when:
- ✅ New blog posts appear on the site within **seconds** (not 60 seconds)
- ✅ Updated blog posts reflect changes **immediately**
- ✅ Deleted blog posts disappear from the site **instantly**
- ✅ Firebase Function logs show successful webhook processing
- ✅ Sanity webhook dashboard shows successful deliveries

## 🔒 Security Notes

- ✅ Secret token is stored securely in Firebase Function environment variables
- ✅ Secret is passed as HTTP header (over HTTPS) to Next.js API
- ✅ Sanity webhook doesn't need the secret (Firebase Function handles authentication)
- ✅ Only blog posts (`_type == "post"`) trigger revalidation

## 📝 Multiple Environments

If you have multiple deployment channels, create separate webhooks:

### Develop Channel
- **URL**: `https://revalidateblog-detxk7y6rq-uc.a.run.app`
- **Name**: `Blog Revalidation - Develop`

### Production Channel
- **URL**: `https://revalidateblog-detxk7y6rq-uc.a.run.app` (same function, but you can create separate functions if needed)
- **Name**: `Blog Revalidation - Production`

**Note**: You can use the same Firebase Function for both, or create separate functions pointing to different Next.js URLs.

---

## 🎯 Quick Reference

**Firebase Function URL**: `https://revalidateblog-detxk7y6rq-uc.a.run.app`  
**Secret Token**: `4K0Tr4pyHrTegHuP87vBe3tVeEr6J2dCmhMX8AZVQdA=`  
**Next.js API**: `https://versionlabs-official--develop-mpnzk56p.web.app/api/blog/revalidate`  
**Sanity Project**: `jh5avta0`  
**Dataset**: `production`

---

**Last Updated**: January 2025  
**Status**: ✅ Ready to Configure
