import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import genericError from 'utils/error-handling';
import { staticText } from 'config/staticText';

export const useNetInfo = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        genericError(staticText.noInternetError);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
};

export const checkInternetConnection = async () => {
  return await NetInfo.fetch().then((state) => {
    return state.isConnected;
  });
};
