import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { storage, StorageKeys } from '../../helpers/utils/storage';

const ONBOARDING_STEPS = [
    '/onboarding',
    '/onboarding/chooseAgeStep',
    '/onboarding/finishStep',
];

export default function OnboardingLayout() {
    const router = useRouter();
    const pathname = usePathname();

    const currentStepIndex = ONBOARDING_STEPS.findIndex(
        (step) => pathname === step || pathname === step.replace('/onboarding', '/onboarding/index')
    );

    const isIntroScreen = pathname === '/onboarding' || pathname === '/onboarding/index';
    const isLastStep = pathname === '/onboarding/finishStep';

    // Progress steps (excluding intro screen)
    const totalProgressSteps = ONBOARDING_STEPS.length - 1;
    const currentProgressStep = isIntroScreen ? 0 : currentStepIndex;

    const handleBack = () => {
        if (currentStepIndex > 0) {
            router.back();
        }
    };

    const handleContinue = () => {
        if (isLastStep) {
            storage.set(StorageKeys.ONBOARDING_DONE, true);
            router.replace('/');
        } else {
            const nextIndex = currentStepIndex + 1;
            if (nextIndex < ONBOARDING_STEPS.length) {
                router.push(ONBOARDING_STEPS[nextIndex] as any);
            }
        }
    };

    const buttonText = isLastStep ? 'Get Started' : 'Continue';
    const showHeader = !isIntroScreen && !isLastStep;

    return (
        <View className="flex-1 bg-[#EEEEEE]">
            <SafeAreaView className="flex-1">
                {showHeader && (
                    <View className="flex-row items-center justify-between px-4 py-3">
                        <TouchableOpacity
                            className="w-10 h-10 rounded-full bg-white/50 justify-center items-center"
                            onPress={handleBack}
                        >
                            <Ionicons name="chevron-back" size={28} color="#333" />
                        </TouchableOpacity>

                        <View className="flex-1 mx-4 justify-center">
                            <View className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                                <View
                                    className="h-full bg-[#333] rounded-full"
                                    style={{ width: `${(currentProgressStep / totalProgressSteps) * 100}%` }}
                                />
                            </View>
                        </View>

                        <View className="w-10" />
                    </View>
                )}

                <View className="flex-1">
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade',
                            animationDuration: 100,
                            contentStyle: { backgroundColor: '#EEEEEE' },
                        }}
                    />
                </View>

                <View className="p-4 pb-6">
                    <TouchableOpacity className="rounded-[32px] overflow-hidden h-14 border-2 border-[#555]" onPress={handleContinue}>
                        <LinearGradient
                            colors={['#4A4A4A', '#2C2C2C', '#1A1A1A']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            className="flex-1"
                        >
                            <View className="flex-1 justify-center items-center bg-[#1C1C1C] rounded-[30px]">
                                <Text className="text-lg font-semibold text-white">{buttonText}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
