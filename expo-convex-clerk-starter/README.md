# Expo Convex Clerk Starter 🚀

A production-ready **Expo SDK 54** boilerplate with **Clerk** authentication and **Convex** backend.

## Features

- 🔐 **Clerk Authentication**: Secure user auth with Expo-optimized SDK
- ⚡ **Convex Backend**: Real-time, type-safe serverless functions
- 🎨 **HeroUI Native**: Beautiful, pre-built components
- 🎐 **Uniwind**: Tailwind CSS for Native (no runtime overhead)
- 🎬 **Onboarding Flow**: Ready-to-use user onboarding screens
- 💲 **Payments**: Integrated RevenueCat for subscriptions/IAP

## Demo 📱

<p align="center">
  <a href="https://player.cloudinary.com/embed/?cloud_name=dzvttwdye&public_id=1a683b93-1dae-4659-b526-faf53424fd11_itmlmu">
    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2JybTgxbzUwNW9mMnBnbmkxNnJsdTJsNWV4YXI5b3U4a20xanQwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9oR33y6nOn5chlEqw3/giphy.gif" alt="Demo GIF" />
  </a>
</p>

---

## Quick Start

### 1. Install dependencies

```bash
cd expo-convex-clerk-starter
bun install
```

### 2. Set up Convex

```bash
npx convex dev
```

This will prompt you to create a new Convex project or select an existing one. It will update `.env.local` with your deployment URL.

### 3. Set up Clerk

1. Create a [Clerk application](https://dashboard.clerk.com/)
2. Copy your **Publishable Key** to `src/config/clerk.ts`
3. In Clerk Dashboard → JWT Templates → Create "convex" template
4. Copy your **JWT Issuer Domain** (e.g., `https://your-app.clerk.accounts.dev`)

### 4. Configure Convex Auth

1. Go to your [Convex Dashboard](https://dashboard.convex.dev/)
2. Navigate to **Settings → Environment Variables**
3. Add `CLERK_JWT_ISSUER_DOMAIN` with your Clerk JWT issuer domain

### 5. Set up Clerk Webhook (Required)

To sync users to your Convex database, you need to configure a Clerk webhook:

1. In your [Clerk Dashboard](https://dashboard.clerk.com/), go to **Webhooks**
2. Click **Add Endpoint**
3. Set the endpoint URL to: `https://YOUR_CONVEX_URL/api/clerk-webhook`
   - Replace `YOUR_CONVEX_URL` with your Convex deployment URL (e.g., `https://your-project-123.convex.site`)
4. Subscribe to the following events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Copy the **Signing Secret** from Clerk
6. In your [Convex Dashboard](https://dashboard.convex.dev/), add environment variable:
   - `CLERK_WEBHOOK_SECRET` = your signing secret from step 5

### 6. Update Config Files

**`src/config/clerk.ts`**

```typescript
export const CLERK_PUBLISHABLE_KEY = "pk_live_YOUR_KEY_HERE"
```

**`src/config/convex.ts`**

```typescript
export const convex = new ConvexReactClient("https://YOUR_PROJECT.convex.cloud")
```

### 7. Prebuild & Run

```bash
# iOS
npx expo prebuild --platform ios
npx expo run:ios --device

# Android
npx expo prebuild --platform android
npx expo run:android --device
```

---

## Configuration

### RevenueCat 💲

1. Update app bundle in `app.json` to match your RevenueCat app
2. Add your API key & entitlements in `src/config/revenuecat.ts`

### Convex Functions

Add your backend functions in the `/convex` folder. They auto-deploy when running `npx convex dev`.

---

## 📂 Project Structure

```
expo-convex-clerk-starter/
├── convex/              # Convex backend functions
│   └── auth.config.ts   # Clerk auth configuration
├── src/
│   ├── app/             # Expo Router screens and layouts
│   │   ├── (tabs)/      # Tab navigation group
│   │   └── onboarding/  # Onboarding flow
│   ├── components/      # Reusable UI components
│   ├── config/          # App configuration
│   │   ├── clerk.ts     # Clerk publishable key
│   │   ├── convex.ts    # Convex client setup
│   │   └── revenuecat.ts# RevenueCat config
│   ├── contexts/        # React Context providers
│   └── helpers/         # Utility functions
├── app.json             # Expo configuration
└── package.json         # Dependencies and scripts
```

---

## Resources

- [Clerk Expo Docs](https://clerk.com/docs/quickstarts/expo)
- [Convex Docs](https://docs.convex.dev/)
- [HeroUI Native](https://github.com/heroui-inc/heroui-native)
