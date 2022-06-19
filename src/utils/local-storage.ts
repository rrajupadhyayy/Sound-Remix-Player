// localstorage helper file to store and read local data
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundFileNames } from 'components/SoundButton/SoundButton.types';
import genericError from './error-handling';

export const storeLocalData = async (key: SoundFileNames, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    genericError();
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
