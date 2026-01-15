import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useThemeColor, useToast } from 'heroui-native';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { useAuth } from '@clerk/clerk-expo';
import LogoDark from '../../../assets/logo-dark.png';
import LogoLight from '../../../assets/logo-light.png';
import { useAppTheme } from '../../contexts/app-theme-context';

export default function Layout() {
  const { isDark } = useAppTheme();
  const { isSignedIn, isLoaded } = useAuth();

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

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  const _renderTitle = () => {
    return (
      <Image
        source={isDark ? LogoLight : LogoDark}
        style={styles.logo}
        resizeMode="contain"
      />
    );
  };

  return (
    <View className="flex-1 bg-background">
      <Tabs
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: themeColorForeground,
          headerStyle: {
            backgroundColor: themeColorBackground,
          },
          headerTransparent: true,
          headerShadowVisible: false,
          tabBarActiveTintColor: themeColorForeground,
          tabBarStyle: {
            backgroundColor: themeColorBackground,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            headerTitle: _renderTitle,
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="user_profile/index"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />



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
