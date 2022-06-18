import Draggable from 'components/Draggable/Draggable';
import globalStyles from 'config/globalStyles';
import useLoader, { LoadingState } from 'hooks/useLoader';
import { useSoundPlayer, loadSound } from 'hooks/useSoundPlayer';
import React, { Fragment, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SoundFileNames, downloadLinks } from 'services/download.constants';
import { getScreenHeight } from 'utils/screen-size';
import styles from './SoundButton.styles';

function SoundButton() {
  const [isInDefaultPosition, setIsInDefault] = useState(true);
  const { loadingStatus, loaderFunction } = useLoader();
  const isLoading = loadingStatus === LoadingState.LOADING;
  const text = isLoading ? 'loading' : 'test';
  const soundRef = loadSound({
    fileName: SoundFileNames.RAIN,
    downloadLink: downloadLinks.rain,
    loaderFunction,
  });

  if (!soundRef) {
    return null;
  }

  const { playSound, stopSound, setSoundVolume } = useSoundPlayer(soundRef);


  const onPlay = () => {
    setIsInDefault(false);
    playSound();
  };

  const onStop = () => {
    setIsInDefault(true);
    stopSound();
  };

  return (
    <Fragment>
      {!isInDefaultPosition ? (
        <View style={[globalStyles.container]}>
          <Draggable
            x={75}
            minX={75}
            maxX={75}
            y={getScreenHeight(70)}
            maxY={getScreenHeight(70)}
            minY={getScreenHeight(10)}
            disabled={isInDefaultPosition}
            onDragRelease={(e) => console.log({ e })}
            onInitialLayout={(initial) => console.log({ initial })}
          >
            <TouchableOpacity
              style={[
                globalStyles.alignCenter,
                styles.buttonContainer,
                globalStyles.boxShadow,
              ]}
              onPress={onStop}
            >
              <Text>{text}</Text>
            </TouchableOpacity>
          </Draggable>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.absoluteButton,
            globalStyles.alignCenter,
            globalStyles.boxShadow,
            styles.buttonContainer,
          ]}
          onPress={onPlay}
        >
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    </Fragment>
  );
}

export default SoundButton;
