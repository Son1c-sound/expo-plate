import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useThemeColor, useToast } from 'heroui-native';
import { useCallback, useEffect } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import LogoDark from '../../../assets/logo-dark.png';
import LogoLight from '../../../assets/logo-light.png';
import { ThemeToggle } from '../../components/theme-toggle';
import { useAppTheme } from '../../contexts/app-theme-context';

export default function Layout() {
  const { isDark } = useAppTheme();
  const [themeColorForeground, themeColorBackground] = useThemeColor([
    'foreground',
    'background',
  ]);

  const reducedMotion = useReducedMotion();
  const { toast } = useToast();

  useEffect(() => {
    if (reducedMotion) {
      toast.show({
        duration: 'persistent',
        variant: 'warning',
        label: 'Reduce motion enabled',
        description: 'All animations will be disabled',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const _renderTitle = () => {
    return (
      <Image
        source={isDark ? LogoLight : LogoDark}
        style={styles.logo}
        resizeMode="contain"
      />
    );
  };

  const _renderThemeToggle = useCallback(() => <ThemeToggle />, []);

  return (
    <View className="flex-1 bg-background">
      <Tabs
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: themeColorForeground,
          headerStyle: {
            backgroundColor: themeColorBackground,
          },
          headerTitleStyle: {
            fontFamily: 'Inter_600SemiBold',
          },
          headerRight: _renderThemeToggle,
          tabBarActiveTintColor: themeColorForeground,
          tabBarStyle: {
            backgroundColor: themeColorBackground,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: _renderTitle,
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="components/index"
          options={{
            title: 'Components',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube" size={size} color={color} />
            ),
          }}
        />


        {/* Hide these screens from the tab bar */}
        <Tabs.Screen name="components/accordion" options={{ href: null }} />
        <Tabs.Screen name="components/avatar" options={{ href: null }} />
        <Tabs.Screen name="components/bottom-sheet" options={{ href: null }} />
        <Tabs.Screen name="components/bottom-sheet-native-modal" options={{ href: null }} />
        <Tabs.Screen name="components/button" options={{ href: null }} />
        <Tabs.Screen name="components/card" options={{ href: null }} />
        <Tabs.Screen name="components/checkbox" options={{ href: null }} />
        <Tabs.Screen name="components/chip" options={{ href: null }} />
        <Tabs.Screen name="components/dialog" options={{ href: null }} />
        <Tabs.Screen name="components/dialog-native-modal" options={{ href: null }} />
        <Tabs.Screen name="components/divider" options={{ href: null }} />
        <Tabs.Screen name="components/error-view" options={{ href: null }} />
        <Tabs.Screen name="components/form-field" options={{ href: null }} />
        <Tabs.Screen name="components/popover" options={{ href: null }} />
        <Tabs.Screen name="components/pressable-feedback" options={{ href: null }} />
        <Tabs.Screen name="components/popover-native-modal" options={{ href: null }} />
        <Tabs.Screen name="components/radio-group" options={{ href: null }} />
        <Tabs.Screen name="components/scroll-shadow" options={{ href: null }} />
        <Tabs.Screen name="components/select-native-modal" options={{ href: null }} />
        <Tabs.Screen name="components/select" options={{ href: null }} />
        <Tabs.Screen name="components/skeleton" options={{ href: null }} />
        <Tabs.Screen name="components/spinner" options={{ href: null }} />
        <Tabs.Screen name="components/surface" options={{ href: null }} />
        <Tabs.Screen name="components/switch" options={{ href: null }} />
        <Tabs.Screen name="components/tabs" options={{ href: null }} />
        <Tabs.Screen name="components/text-field" options={{ href: null }} />
        <Tabs.Screen name="components/toast" options={{ href: null }} />
        <Tabs.Screen name="components/toast-native-modal" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 24,
  },
});
