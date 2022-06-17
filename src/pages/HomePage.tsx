import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import useLoader, { LoadingState } from 'hooks/useLoader';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Sound from 'react-native-sound';
import { downloadMP3 } from 'services/download-mp3';
import { downloadLinks, SoundFileNames } from 'services/download.constants';

function HomePage() {
  const [downloadPath, setDownloadPath] = useState<string>('');
  const { loadingStatus, loaderFunction } = useLoader();
  console.log({ loadingStatus });

  const downloadSound = async () => {
    const downloadPath = await loaderFunction({
      callbackFunction: downloadMP3,
      params: {
        fileName: SoundFileNames.RAIN,
        downloadLink: downloadLinks.rain,
      },
    });
    setDownloadPath(downloadPath);
  };

  const playSound = () => {
    var whoosh = new Sound(downloadPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Text>
        {loadingStatus === LoadingState.LOADING
          ? 'loading'
          : staticText.appName}
      </Text>
      <Button onPress={downloadSound} title={'download music'} />
      <Button onPress={playSound} title={'play music'} />
    </View>
  );
}

export default HomePage;
