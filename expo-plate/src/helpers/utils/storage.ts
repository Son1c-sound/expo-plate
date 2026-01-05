import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const StorageKeys = {
  ONBOARDING_DONE: 'onboarding_done',
  USER_GENDER: 'user_gender',
  USER_AGE: 'user_age',
  USER_TEXT_STYLE: 'user_text_style',
  USER_TONE: 'user_tone',
} as const;
