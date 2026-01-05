import { View, Text } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 p-6">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-[#333] mb-3 text-center">Welcome to Vibely</Text>
        <Text className="text-lg text-[#666] text-center">Your AI-powered dating assistant</Text>
      </View>
    </View>
  );
}
