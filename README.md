# Expo Plate 🍽️

Get expo-plate (basic) - if you want no auth and no db, just onboarding, paywall, HeroUI etc..
Get explo-convex-clerk - if you want Convex DB synced with Clerk Auth ( same as basic with authentication + db )

A concise **Expo SDK 54** boilerplate designed to get you shipping fast. 

## Features

-   **HeroUI Native**: Beautiful, pre-built components.
-   **Uniwind**: Tailwind CSS for Native (no runtime overhead).
-   **Onboarding Flow**: Ready-to-use user onboarding screens.
-   **Payments**: Integrated RevenueCat (`react-native-purchases`) for subscriptions/IAP.
## Demo 📱

<p align="center">
  <a href="https://player.cloudinary.com/embed/?cloud_name=dzvttwdye&public_id=1a683b93-1dae-4659-b526-faf53424fd11_itmlmu">
    <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2JybTgxbzUwNW9mMnBnbmkxNnJsdTJsNWV4YXI5b3U4a20xanQwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9oR33y6nOn5chlEqw3/giphy.gif" alt="Demo GIF" />
  </a>
</p>

## Get Started with project

1. **Install dependencies**

    ```bash
    cd expo-plate
    bun install

    # Prebuild
    ios:
    npx expo prebuild --platform ios

    android:
    npx expo prebuild --platform android
    ```

2. **Run the app**
    ```bash
    npx expo run:ios --device
    ```

    or

    ```bash
    npx expo run:android --device
    ```

That's it. Start editing `src/app/` to build your product.

## Get Started with RevenueCat 💲 

1. Change app bundle in `app.json` to your app bundle ( that matches revenuecat )

2. Add your RevenueCat API key & entitlements in `config/revenuecat.ts`

## HeroUI Native 🎨

([HeroUI Native](https://github.com/heroui-inc/heroui-native))

## 📂 Project Structure

```
expo-plate/
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── src/
│   ├── app/             # Expo Router screens and layouts
│   │   ├── (tabs)/      # Tab navigation group
│   │   └── onboarding/  # Onboarding flow
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React Context providers
│   ├── helpers/         # Utility functions
│   └── themes/          # Theme configuration
├── assets/              # Images and fonts
├── scripts/             # Helper scripts
└── ...
```
