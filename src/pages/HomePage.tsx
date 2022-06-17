import Draggable from 'components/DraggableComponent';
import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import useLoader, { LoadingState } from 'hooks/useLoader';
import useSoundPlayer from 'hooks/useSoundPlayer';
import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { downloadLinks, SoundFileNames } from 'services/download.constants';
import { getScreenHeight } from 'utils/screen-size';

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
      <Draggable
        x={75}
        minX={75}
        maxX={75}
        y={getScreenHeight(80)}
        maxY={getScreenHeight(90)}
        minY={getScreenHeight(10)}
        onShortPressRelease={() => Alert.alert('touched!!')}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: 'orange',
          }}
        >
          <Text>test</Text>
        </View>
      </Draggable>

      {/* <Button onPress={stopSound} title={'stop music'} />
      <Button onPress={playSound} title={'play music'} />
      <Button onPress={setSoundVolume} title={'change volume'} /> */}
    </View>
  );
}

export default HomePage;
