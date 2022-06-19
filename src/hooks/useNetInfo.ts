// Hook to monitor network status of the device
import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import genericError from 'utils/error-handling';
import { staticText } from 'config';

// event listener for network change
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

// function to check if device is connected to internet
export const checkInternetConnection = async () => {
  return await NetInfo.fetch().then((state) => {
    return state.isConnected;
  });
};
