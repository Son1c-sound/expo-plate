import React, { useState } from 'react';
import { View, Text, Alert, Pressable, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { useSSO, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Button } from 'heroui-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Svg, { Path } from 'react-native-svg';

// Apple Logo SVG
const AppleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="white">
    <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </Svg>
);

// Google Logo SVG
const GoogleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </Svg>
);

export default function SignIn() {
  const { startSSOFlow } = useSSO();
  const { signIn, isLoaded: isSignInLoaded, setActive: setActiveFromSignIn } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded, setActive: setActiveFromSignUp } = useSignUp();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState<'signIn' | 'signUp' | null>(null);

  const handleSSO = async (strategy: 'oauth_google' | 'oauth_apple') => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        // Setting active session will trigger auth state change
        // and the app will automatically redirect via index.tsx
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('SSO Error:', err);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email.trim()) return;
    setIsLoading(true);
    
    try {
      const si = await signIn!.create({ identifier: email.trim() });
      const emailFactor = si.supportedFirstFactors?.find(
        (f: any) => f.strategy === 'email_code'
      ) as any;
      
      await signIn!.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: emailFactor.emailAddressId,
      });
      setPendingVerification('signIn');
    } catch {
      await signUp!.create({ emailAddress: email.trim() });
      await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification('signUp');
    } finally {
      setIsLoading(false);
      Alert.alert('Code sent', 'Check your email.');
    }
  };

  const handleVerifyCode = async () => {
    if (!emailCode.trim() || !pendingVerification) return;

    setIsLoading(true);
    try {
      if (pendingVerification === 'signIn' && signIn) {
        const attempt = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code: emailCode.trim(),
        });
        if (attempt?.status === 'complete') {
          // Setting active session will trigger auth state change
          // and the app will automatically redirect via index.tsx
          await setActiveFromSignIn?.({ session: attempt.createdSessionId });
        }
      } else if (pendingVerification === 'signUp' && signUp) {
        const attempt = await signUp.attemptEmailAddressVerification({
          code: emailCode.trim(),
        });
        if (attempt?.status === 'complete') {
          // Setting active session will trigger auth state change
          // and the app will automatically redirect via index.tsx
          await setActiveFromSignUp?.({ session: attempt.createdSessionId });
        }
      }
    } catch {
      Alert.alert('Error', 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    // btw should add Loadings when email sign in and verify ( there is no loadings added so screen
    // appears static for a moment )
    <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
      style={{ flex: 1, backgroundColor: 'white' }}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ headerShown: false }} />
      
      <Text className="text-3xl font-bold text-center mb-8">Sign In</Text>

      {!pendingVerification ? (
        <View className="gap-4">
          <Button 
            onPress={() => handleSSO('oauth_apple')}
            className="flex-row items-center justify-center gap-3 bg-black rounded-xl"
          >
            <AppleLogo />
            <Button.Label className="text-white font-semibold text-base">Continue with Apple</Button.Label>
          </Button>
          
          <Button 
            onPress={() => handleSSO('oauth_google')}
            className="flex-row items-center justify-center gap-3 bg-white border border-gray-300  rounded-xl"
          >
            <GoogleLogo />
            <Text className="text-gray-800 font-semibold text-base">Continue with Google</Text>
          </Button>

          <View className="flex-row items-center">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-4 text-gray-400">or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <TextInput
            placeholder="Email address"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-white border border-gray-300 rounded-xl px-4 py-3"
          />
          
          <Button 
            onPress={handleEmailSignIn}
            isDisabled={!email.trim()}
            className="bg-purple-500 rounded-xl shadow-md"
          >
            <Button.Label>Continue with Email</Button.Label>
          </Button>
        </View>
      ) : (
        <View className="gap-4">
          <Text className="text-center text-gray-600 mb-4">
            Enter the code sent to {email}
          </Text>
          
          <TextInput
            placeholder="6-digit code"
            placeholderTextColor="#9CA3AF"
            value={emailCode}
            onChangeText={setEmailCode}
            keyboardType="number-pad"
            className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3"
          />
          
          <Button 
            onPress={handleVerifyCode}
            isDisabled={!emailCode.trim()}
          >
            Verify Code
          </Button>
          
          <Button 
            variant="primary"
            onPress={() => {
              setPendingVerification(null);
              setEmailCode('');
            }}
          >
            Back
          </Button>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}