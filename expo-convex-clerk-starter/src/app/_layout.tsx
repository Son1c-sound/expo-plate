import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Redirect, Slot, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { HeroUINativeProvider } from 'heroui-native';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import '../../global.css';
import { AppThemeProvider } from '../contexts/app-theme-context';
import { OnboardingProvider, useOnboarding } from '../contexts/onboarding-context';
import { RevenueCatProvider } from '../contexts/revenuecat-context';
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { CLERK_PUBLISHABLE_KEY } from '../config/clerk';
import { convex } from '../config/convex';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync();


function AppContent() {
  const contentWrapper = useCallback(
    (children: React.ReactNode) => (
      <KeyboardAvoidingView
        pointerEvents="box-none"
        behavior="padding"
        keyboardVerticalOffset={12}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    ),
    []
  );

  const { onboardingDone } = useOnboarding();
  const { isLoaded } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && onboardingDone !== null) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded, onboardingDone]);

  if (onboardingDone === null || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!onboardingDone && !pathname.startsWith('/onboarding')) {
    return <Redirect href="/onboarding" />;
  }
  
  
  
  

  return (
    <AppThemeProvider>
      <HeroUINativeProvider
        config={{
          toast: {
            contentWrapper,
          },
        }}
      >
        <Slot />
      </HeroUINativeProvider>
    </AppThemeProvider>
  );
}

export default function Layout() {
  const fonts = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fonts) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <KeyboardProvider>
            <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
            <ClerkLoaded>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <RevenueCatProvider>
          <OnboardingProvider>
            <AppContent />
          </OnboardingProvider>
        </RevenueCatProvider>
          </ConvexProviderWithClerk>
        </ClerkLoaded>
        </ClerkProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
