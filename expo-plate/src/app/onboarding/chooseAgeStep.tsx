import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { storage, StorageKeys } from '../../helpers/utils/storage';

type AgeRange = 'under18' | '18-24' | '25-34' | '35-44' | '45+';

const AGE_OPTIONS: { value: AgeRange; label: string }[] = [
  { value: 'under18', label: 'Under 18' },
  { value: '18-24', label: '18-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45+', label: '45+' },
];

export default function ChooseAgeStep() {
  const [age, setAge] = useState<AgeRange | null>(null);

  useEffect(() => {
    const saved = storage.getString(StorageKeys.USER_AGE);
    if (saved) setAge(saved as AgeRange);
  }, []);

  const handleAgeSelect = (selectedAge: AgeRange) => {
    setAge(selectedAge);
    storage.set(StorageKeys.USER_AGE, selectedAge);
  };

  return (
    <View className="flex-1 p-6">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-[#333] mb-3 text-center">What's your age?</Text>
        <Text className="text-base text-[#666] mb-12 text-center">This helps us tailor content for you</Text>

        <View className="w-full gap-3">
          {AGE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              className={`w-full p-4 rounded-xl border-2 ${
                age === option.value
                  ? 'bg-[#333] border-[#333]'
                  : 'bg-white border-[#E0E0E0]'
              }`}
              onPress={() => handleAgeSelect(option.value)}
            >
              <Text
                className={`text-base font-medium text-center ${
                  age === option.value ? 'text-white' : 'text-[#333]'
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
