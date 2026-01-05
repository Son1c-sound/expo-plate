import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { storage, StorageKeys } from '../../helpers/utils/storage';
import { usePlacement } from 'expo-superwall';

interface UserPreferences {
    gender: string | null;
    age: string | null;
    textStyle: string | null;
    tone: string | null;
}

const displayLabels: Record<string, Record<string, string>> = {
    gender: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
    },
    age: {
        under18: 'Under 18',
        '18-24': '18-24',
        '25-34': '25-34',
        '35-44': '35-44',
        '45+': '45+',
    },
    textStyle: {
        lowercase: 'lowercase',
        uppercase: 'Capitalized',
    },
    tone: {
        genz: 'Gen-Z Slang',
        proper: 'Proper English',
    },
};

const LOADING_MESSAGES = [
    'Customizing your experience...',
    'Setting up your preferences...',
    'Almost there...',
];

export default function FinishStep() {
    const [preferences, setPreferences] = useState<UserPreferences>({
        gender: null,
        age: null,
        textStyle: null,
        tone: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Try to show paywall - but don't block onboarding completion
    const { registerPlacement } = usePlacement({});

    useEffect(() => {
        // Try Superwall paywall (fire and forget - doesn't affect onboarding)
        registerPlacement({ placement: 'campaign_trigger' }).catch(() => {
            // Superwall failed - that's ok, onboarding still completes
        });
    }, []);

    useEffect(() => {
        // Load preferences from MMKV (synchronous)
        const gender = storage.getString(StorageKeys.USER_GENDER) ?? null;
        const age = storage.getString(StorageKeys.USER_AGE) ?? null;
        const textStyle = storage.getString(StorageKeys.USER_TEXT_STYLE) ?? null;
        const tone = storage.getString(StorageKeys.USER_TONE) ?? null;
        setPreferences({ gender, age, textStyle, tone });
    }, []);

    useEffect(() => {
        // Fake loading animation
        const duration = 2500;
        const interval = 50;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(Math.round(newProgress));

            if (newProgress < 40) {
                setMessageIndex(0);
            } else if (newProgress < 75) {
                setMessageIndex(1);
            } else {
                setMessageIndex(2);
            }

            Animated.timing(progressAnim, {
                toValue: newProgress,
                duration: interval,
                useNativeDriver: false,
            }).start();

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoading(false);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }, 200);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const getDisplayValue = (category: string, value: string | null) => {
        if (!value) return 'Not selected';
        return displayLabels[category]?.[value] || value;
    };

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center p-6">
                <View className="items-center w-full">
                    <Text className="text-7xl font-bold text-[#333] mb-4">{progress}%</Text>
                    <Text className="text-lg font-medium text-[#666] mb-8 text-center">
                        {LOADING_MESSAGES[messageIndex]}
                    </Text>

                    <View className="w-full items-center">
                        <View className="w-full h-2 bg-[#E0E0E0] rounded overflow-hidden">
                            <Animated.View
                                className="h-full bg-[#333] rounded"
                                style={{ width: progressWidth }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <Animated.View className="flex-1" style={{ opacity: fadeAnim }}>
            <ScrollView className="flex-1" contentContainerClassName="flex-grow p-6">
                <View className="flex-1 items-center pt-5">
                    <Text className="text-6xl mb-4">🎉</Text>
                    <Text className="text-3xl font-bold text-[#333] mb-2 text-center">You're All Set!</Text>
                    <Text className="text-base text-[#666] mb-8 text-center leading-6">
                        Congrats! You're ready to start your journey with Vibely
                    </Text>

                    {/* User Preferences Summary */}
                    <View className="w-full">
                        <Text className="text-sm font-semibold text-[#999] uppercase tracking-wider mb-4 text-center">
                            Your Preferences
                        </Text>

                        <View className="bg-[#F5F5F5] rounded-xl p-4 mb-2.5 shadow-sm">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[15px] text-[#666]">Gender</Text>
                                <Text className="text-[15px] font-semibold text-[#333]">
                                    {getDisplayValue('gender', preferences.gender)}
                                </Text>
                            </View>
                        </View>

                        <View className="bg-[#F5F5F5] rounded-xl p-4 mb-2.5 shadow-sm">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[15px] text-[#666]">Age</Text>
                                <Text className="text-[15px] font-semibold text-[#333]">
                                    {getDisplayValue('age', preferences.age)}
                                </Text>
                            </View>
                        </View>

                        <View className="bg-[#F5F5F5] rounded-xl p-4 mb-2.5 shadow-sm">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[15px] text-[#666]">Style</Text>
                                <Text className="text-[15px] font-semibold text-[#333]">
                                    {getDisplayValue('textStyle', preferences.textStyle)}
                                </Text>
                            </View>
                        </View>

                        <View className="bg-[#F5F5F5] rounded-xl p-4 mb-2.5 shadow-sm">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-[15px] text-[#666]">Tone</Text>
                                <Text className="text-[15px] font-semibold text-[#333]">
                                    {getDisplayValue('tone', preferences.tone)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Animated.View>
    );
}
