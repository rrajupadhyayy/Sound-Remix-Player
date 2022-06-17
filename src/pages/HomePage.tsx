import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';

const downloadLink =
  'https://cdn.freesound.org/sounds/507/507902-819d5219-fe2a-4b8c-91ce-c875c169bcfb?filename=507902__inuetc__heavy-rain-sound-inu-etc.mp3';
const path = RNFetchBlob.fs.dirs.DocumentDir;

function HomePage() {
  const [downloadPath, setDownloadPath] = useState<string>('');
  const downloadSound = () => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      path: path + '/rain.mp3',
    })
      .fetch('GET', downloadLink, {
        //some headers ..
      })
      .then((res) => {
        console.log({ res });
        setDownloadPath(res.path());
        console.log('The file is save to ', res.path());
      })
      .catch((error) => console.log({ error }));
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
      <Text>{staticText.appName}</Text>
      <Button onPress={downloadSound} title={'download music'} />
      <Button onPress={playSound} title={'play music'} />
    </View>
  );
}

export default HomePage;
