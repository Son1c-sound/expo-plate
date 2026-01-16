import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Redirect, Slot, usePathname } from 'expo-router';
import { HeroUINativeProvider } from 'heroui-native';
import { useCallback } from 'react';
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

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

/**
 * Component that wraps app content inside KeyboardProvider
 * Contains the contentWrapper and HeroUINativeProvider configuration
 */
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
  const pathname = usePathname();


  if (onboardingDone === null) {
    return null;
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
        <RevenueCatProvider>
          <OnboardingProvider>
            <AppContent />
          </OnboardingProvider>
        </RevenueCatProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
