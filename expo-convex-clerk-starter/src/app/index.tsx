import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

export default function RootIndex() {
    const { isSignedIn, isLoaded } = useAuth();
    
    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    if (isSignedIn) {
        return <Redirect href="/(tabs)/home" />;
    }
    
    return <Redirect href="/(auth)/sign-in" />;
}
