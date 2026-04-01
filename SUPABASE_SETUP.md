# Supabase Setup Guide for DeenStream

## 🔑 Step 1: Get Your API Keys

1. Visit: https://app.supabase.com/project/exlxztehrxcyevssnciq/settings/api
2. Under "Project API keys":
   - Find **"Publishable Key (anon)"**
   - **⚠️ IMPORTANT**: Copy the **full JWT token** (the long string starting with `eyJ`), NOT the `sb_publishable_` label
   - It should look like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...` (100+ characters, 3 parts separated by dots)
   - Also get **Service Role Key**: Same format, starts with `eyJ`

## 📧 Step 2: Enable Email Authentication

1. Go to: https://app.supabase.com/project/exlxztehrxcyevssnciq/auth/providers
2. Find "Email" and click it
3. Enable the Email provider
4. Check: "Confirm email" option ✅
5. Click "Save"

## 🔐 Step 3: Set Email Redirect URLs (IMPORTANT - Where you were looking!)

**This is in Settings → Auth, NOT in Providers**

1. Go to: https://app.supabase.com/project/exlxztehrxcyevssnciq/settings/auth
2. Scroll down to find **"Site URL"** field
3. Set it to: `https://deen-essence-glow.vercel.app`
4. Below that, find **"Redirect URLs"** section
5. Add these URLs (one per line):
   ```
   http://localhost:3000
   http://localhost:8080
   http://localhost:5173
   https://deen-essence-glow.vercel.app
   https://deen-essence-glow.vercel.app/auth
   ```
6. Click **"Save"** button at the bottom

## 📬 Step 4: Configure Email Provider

1. In the same **Settings → Auth** page
2. Scroll to **"Email Auth"** section
3. Choose your email provider:
   - **Auth0** - Built-in, start immediately
   - **Resend** - Recommended for production (requires API key)
   - **SendGrid** - Alternative option
4. Click **"Save"**

## 🗄️ Step 5: Create Auth Tables (Optional but Recommended)

Run these in the SQL Editor at: https://app.supabase.com/project/exlxztehrxcyevssnciq/sql/new

```sql
-- Users Profile Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

## ✅ Step 6: Environment Variables (READY!)

Your `.env` file is now updated with:

- ✅ Publishable Key: `sb_publishable_dYM6gsi7ED-zs6efyDm5zA_bYBxHS63`
- ✅ Service Role Key: Ready to use
- ✅ All URLs configured

No further action needed for .env!

## ✅ Verification Checklist

Complete these steps in order:

1. **Providers → Email**
   - [ ] Go to https://app.supabase.com/project/exlxztehrxcyevssnciq/auth/providers
   - [ ] Email provider is enabled
   - [ ] "Confirm email" is checked

2. **Settings → Auth**
   - [ ] Site URL is set to `https://deen-essence-glow.vercel.app`
   - [ ] Redirect URLs include all localhost and production domains
   - [ ] Email Auth provider selected (Auth0 or Resend)

3. **Environment Variables**
   - [ ] `.env` file updated with keys (already done ✅)
   - [ ] Keys are in the correct format (starting with `sb_publishable_` and `eyJ...`)

4. **Test It**
   - [ ] Visit: https://deen-essence-glow.vercel.app/auth
   - [ ] Click "Sign Up"
   - [ ] Enter test email and password
   - [ ] Should work without "Invalid API key" error

## 🆘 Troubleshooting

**"Invalid API key" error:**

- ✅ Fixed: Your keys are now updated in .env
- Publishable Key should start with `sb_publishable_`
- Service Role Key should start with `eyJ...`

**Can't find "Redirect URLs" setting:**

- ❌ Wrong place: NOT in Auth → Providers
- ✅ Correct place: **Settings → Auth** (scroll down)
- Direct link: https://app.supabase.com/project/exlxztehrxcyevssnciq/settings/auth
- Look below "Site URL" field for "Redirect URLs"

**"Email not sent" error:**

- Check SMTP settings in Authentication → Email
- Verify sender email is configured
- Check spam folder
- Try Auth0 provider (built-in, no setup needed)

**"404: NOT_FOUND" error:**

- ❌ Your publishable key is in the WRONG FORMAT
- Check file: `API_KEY_FIX.md` for detailed fix instructions
- Key should be a full JWT token starting with `eyJ` (100+ chars)
- NOT: `sb_publishable_XXXXX` (this is just a label)
- Go to Settings → API and copy the FULL token, not the label

**"Redirect URL mismatch":**

- Make sure your domain is added to allowed redirects
- Use exact domain: `https://deen-essence-glow.vercel.app`
- Include paths if needed: `/auth`, `/reset-password`

**Still having issues?**

- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Verify all 6 env variables in `.env` file
- Deploy again: `vercel deploy --prod --yes`
- Check `API_KEY_FIX.md` for the 404 error solution
