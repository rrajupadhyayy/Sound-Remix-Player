import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundFileNames } from 'services/download.constants';

export const storeLocalData = async (key: SoundFileNames, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.info(e);
  }
};

export const getLocalData = async (key: SoundFileNames) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  } catch (_error) {
    return null;
  }
};
