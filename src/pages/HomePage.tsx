import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import useLoader, { LoadingState } from 'hooks/useLoader';
import useSoundPlayer from 'hooks/useSoundPlayer';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { downloadLinks, SoundFileNames } from 'services/download.constants';

function HomePage() {
  const { loadingStatus, loaderFunction } = useLoader();
  const { playSound, stopSound, setSoundVolume } = useSoundPlayer({
    fileName: SoundFileNames.RAIN,
    downloadLink: downloadLinks.rain,
    loaderFunction,
  });

  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Text>
        {loadingStatus === LoadingState.LOADING
          ? 'loading'
          : staticText.appName}
      </Text>
      <Button onPress={stopSound} title={'stop music'} />
      <Button onPress={playSound} title={'play music'} />
      <Button onPress={setSoundVolume} title={'change volume'} />
    </View>
  );
}

export default HomePage;
