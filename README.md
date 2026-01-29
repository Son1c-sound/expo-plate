# Expo Plate 🍽️

# Start with one command or clone repos 

    npx create-expo-plate my app

- **Expo Base** – Includes:
  - Onboarding flow
  - Paywall integration
  - HeroUI Native components
  - Uniwind (Tailwind CSS for React Native)

- **Expo Full (Convex + Clerk)** – Includes everything in **Expo Base**, plus:
  - Convex setup (backend & database)
  - Clerk authentication

## ⚠️ Important Notes

✏️ If you'r app crashes in production, it is because you missing ENV's in eas dashboard
either hardcode ENV s or load from eas

✏️ Don't forget to change "package": "change.pkg.name", in app.json before pushing initial app version. 

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

For convex + clerk please look into  <a href='https://github.com/zuraHQ/expo-plate-starter/tree/main/expo-convex-clerk'>this readme:</a> 

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
