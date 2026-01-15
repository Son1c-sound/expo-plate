import { createMMKV } from 'react-native-mmkv';

export const storage_instance = createMMKV();

export const StorageKeys = {
  ONBOARDING_DONE: 'onboarding_done',
  USER_NAME: 'user_name',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const storage = {
  set: async (key: string, value: string | boolean | number) => {
    try {
      storage_instance.set(key, value);
    } catch (e) {
      console.error('Error saving data', e);
    }
  },
  getString: async (key: string) => {
    try {
      return storage_instance.getString(key);
    } catch (e) {
      console.error('Error reading data', e);
      return null;
    }
  },
  getBoolean: async (key: string) => {
    try {
      return storage_instance.getBoolean(key);
    } catch (e) {
      console.error('Error reading data', e);
      return false;
    }
  },
  remove: async (key: string) => {
    try {
      storage_instance.remove(key);
    } catch (e) {
      console.error('Error removing data', e);
    }
  },
};
