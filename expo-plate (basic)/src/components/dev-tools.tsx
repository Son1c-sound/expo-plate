import { View } from 'react-native';
import { Button, Divider } from 'heroui-native';
import { useOnboarding } from '../contexts/onboarding-context';
import { useRevenueCat } from '../contexts/revenuecat-context';
import { storage, StorageKeys } from '../helpers/utils/storage';
import { AppText } from './app-text';

export function DevTools() {
    const { setOnboardingDone } = useOnboarding();
    const { presentPaywall } = useRevenueCat();

    const handleResetOnboarding = async () => {
        await setOnboardingDone(false);
        await storage.remove(StorageKeys.USER_NAME);
        await storage.remove(StorageKeys.USER_PREFERENCES);
    };

    return (
        <Divider className="mt-3">
        <View className="mt-3 gap-3">
            <Button variant="primary" className="bg-red-500" onPress={handleResetOnboarding}>
                <Button.Label>Reset Onboarding</Button.Label>
            </Button>
            <Button variant="primary" onPress={presentPaywall}>
                <Button.Label>Test Paywall</Button.Label>
            </Button>
        </View>
        </Divider>
    );
}
