# Expo Plate

A concise **Expo SDK 54** boilerplate designed to get you shipping fast.

## ⚡ Features

-   **HeroUI Native**: Beautiful, pre-built components.
-   **Uniwind**: Tailwind CSS for Native (no runtime overhead).
-   **Onboarding Flow**: Ready-to-use user onboarding screens.
-   **Payments**: Integrated RevenueCat (`react-native-purchases`) for subscriptions/IAP.

## 🚀 Get Started

1. **Install dependencies**

    ```bash
    cd expo-plate
    bun install
    ```

2. **Run the app**
    ```bash
    npx expo run:ios --device
    ```

That's it. Start editing `src/app/` to build your product.

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
