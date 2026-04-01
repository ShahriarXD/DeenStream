# 🔴 404 NOT_FOUND Error - Fix Your API Key

## The Problem

Your current publishable key: `sb_publishable_dYM6gsi7ED-zs6efyDm5zA_bYBxHS63`

This is **WRONG** - it's too short and has the wrong format.

## The Solution

The publishable key should be a **full JWT token** that looks like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bHh6dGVocnhjeWV2c3NuY2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDU1MTksImV4cCI6MjA5MDU4MTUxOX0.pbsINI77uwyrjjMZghwjuRHfn4gt9ZioxUo4RunsGVk
```

**Not** just `sb_publishable_XXXXX`

## How to Get the Correct Key

### Step 1: Open Supabase Settings

1. Go to: https://app.supabase.com/project/exlxztehrxcyevssnciq/settings/api
2. Look for **"Project API keys"** section

### Step 2: Find "Publishable Key (anon)"

You should see something like:

```
┌─────────────────────────────────┐
│ Publishable Key (anon)          │
│ sb_publishable_XXXXX....        │  ← This label
│ [eyJhbGciOiHUzI1NiIs...]       │  ← This is the REAL KEY (JWT token)
│ [Copy]                          │
└─────────────────────────────────┘
```

### Step 3: Copy the Full JWT Token

- Click the **actual key text** (the long string starting with `eyJ`)
- Or click **[Copy]** button to copy the full JWT token
- **NOT** the `sb_publishable_` label

### Step 4: Update Your .env File

Replace this:

```env
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_dYM6gsi7ED-zs6efyDm5zA_bYBxHS63
SUPABASE_PUBLISHABLE_KEY=sb_publishable_dYM6gsi7ED-zs6efyDm5zA_bYBxHS63
```

With this (paste your FULL JWT token):

```env
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bHh6dGVocnhjeWV2c3NuY2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDU1MTksImV4cCI6MjA5MDU4MTUxOX0.pbsINI77uwyrjjMZghwjuRHfn4gt9ZioxUo4RunsGVk
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4bHh6dGVocnhjeWV2c3NuY2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMDU1MTksImV4cCI6MjA5MDU4MTUxOX0.pbsINI77uwyrjjMZghwjuRHfn4gt9ZioxUo4RunsGVk
```

## How to Verify It's Correct

✅ Correct format:

- Starts with `eyJ`
- Contains 3 parts separated by `.` (like: `xxxxx.xxxxx.xxxxx`)
- Is 100+ characters long
- No `sb_publishable_` prefix

❌ Incorrect format:

- Starts with `sb_publishable_`
- Is very short (50 chars or less)
- Only 2 parts or unclear format

## After Updating

1. Save your `.env` file
2. Deploy again: `vercel deploy --prod --yes`
3. Test at: https://deen-essence-glow.vercel.app/auth

The 404 error should be gone! ✅
