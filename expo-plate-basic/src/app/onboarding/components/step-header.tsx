import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

interface StepHeaderProps {
    currentStep: number;
    totalSteps: number;
}

export function StepHeader({ currentStep, totalSteps }: StepHeaderProps) {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const canGoBack = currentStep > 1;

    return (
        <View
            className="px-4 flex-row items-center justify-between"
            style={{ paddingTop: insets.top + 12 }}
        >
            <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 items-center justify-center"
                style={{ opacity: canGoBack ? 1 : 0 }}
                disabled={!canGoBack}
            >
                <Feather name="chevron-left" size={24} color="#888" />
            </Pressable>

            {/* Dots */}
            <View className="flex-row items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <View
                        key={index}
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: index < currentStep ? '#006FEE' : '#d4d4d8',
                        }}
                    />
                ))}
            </View>
            <View className="w-10" />
        </View>
    );
}
