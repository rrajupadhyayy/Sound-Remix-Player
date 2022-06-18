import SoundButton from 'components/SoundButton/SoundButton';
import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import useLoader, { LoadingState } from 'hooks/useLoader';
import React from 'react';
import { Text, View } from 'react-native';

function HomePage() {
  const { loadingStatus, loaderFunction } = useLoader();
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Text>
        {loadingStatus === LoadingState.LOADING
          ? 'loading'
          : staticText.appName}
      </Text>
      <SoundButton />
    </View>
  );
}

export default HomePage;
