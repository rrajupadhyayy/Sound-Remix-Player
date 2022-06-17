import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import React from 'react';
import { Button, Text, View } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const downloadLink =
  'https://cdn.freesound.org/sounds/507/507902-819d5219-fe2a-4b8c-91ce-c875c169bcfb?filename=507902__inuetc__heavy-rain-sound-inu-etc.mp3';
const path = RNFetchBlob.fs.dirs.DocumentDir;

function HomePage() {
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
        console.log('The file is save to ', res.path());
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Text>{staticText.appName}</Text>
      <Button onPress={downloadSound} title={'download music'} />
    </View>
  );
}

export default HomePage;
