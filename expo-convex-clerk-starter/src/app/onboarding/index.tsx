import { View } from 'react-native';
import { AppText } from '../../components/app-text';

export default function WelcomeScreen() {
    return (
        <View
            className="flex-1 bg-background px-6"
            style={{ paddingTop: 40 }}
        >
            <View className="flex-1 items-center">
                <View className="size-20 bg-primary/10 rounded-3xl items-center justify-center mb-8">
                    <AppText className="text-4xl">🚀</AppText>
                </View>

                <AppText className="text-4xl font-bold text-foreground text-center mb-4">
                    Welcome to Expo Plate
                </AppText>

                <AppText className="text-lg text-muted text-center leading-relaxed">
                    The ultimate boilerplate for high-performance React Native apps with Expo.
                </AppText>
            </View>
        </View>
    );
}
