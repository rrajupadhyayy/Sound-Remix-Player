import Draggable from 'components/Draggable/Draggable';
import globalStyles from 'config/globalStyles';
import useLoader from 'hooks/useLoader';
import { useSoundPlayer, loadSound } from 'hooks/useSoundPlayer';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SoundFileNames, downloadLinks } from 'services/download.constants';
import { getScreenWidth } from 'utils/screen-size';
import styles from './SoundButton.styles';
import {
  commonDraggableProps,
  commonProgressProps,
  generateAudioRanges,
  getSoundIconColor,
  soundIconSize,
} from './SoundButton.utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icons } from 'config/icons';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';

function SoundButton() {
  const [isInDefaultPosition, setIsInDefault] = useState(true);
  const { loaderFunction } = useLoader();
  const { whoosh, loadingPercentage, setLoadingPercentage } = loadSound({
    fileName: SoundFileNames.RAIN,
    downloadLink: downloadLinks.rain,
    loaderFunction,
  });

  const { playSound, stopSound, setSoundVolume } = useSoundPlayer(whoosh);

  const onPlay = () => {
    setIsInDefault(false);
    playSound();
  };

  const onStop = () => {
    setIsInDefault(true);
    stopSound();
  };

  const handleDrag = (position?: string) => {
    if (position) {
      const top = Number(position) !== 0 ? Number(position) * -1 : 0;
      const rangeArray = generateAudioRanges();
      let volume = 0.1;
      rangeArray.forEach((item) => {
        if (item.minLimit <= top && top < item.maxLimit) {
          volume = item.volume;
        }
      });
      setSoundVolume(volume);
    }
  };

  const iconComponent = (name: Icons) => {
    return (
      <Icon
        name={name}
        color={getSoundIconColor(isInDefaultPosition)}
        size={soundIconSize}
      />
    );
  };

  const touchableComponent = () => {
    return (
      <TouchableOpacity
        style={[
          globalStyles.alignCenter,
          styles.buttonContainer,
          globalStyles.boxShadow,
          isInDefaultPosition && styles.absoluteButton,
        ]}
        onPress={isInDefaultPosition ? onPlay : onStop}
      >
        {isInDefaultPosition ? (
          <CircularProgressBase
            initialValue={loadingPercentage}
            value={loadingPercentage}
            {...commonProgressProps}
          >
            {iconComponent(Icons.WATER)}
          </CircularProgressBase>
        ) : (
          iconComponent(Icons.WATER)
        )}
      </TouchableOpacity>
    );
  };

  return !isInDefaultPosition ? (
    <View style={[globalStyles.container]}>
      <Draggable
        {...commonDraggableProps}
        x={getScreenWidth(4)}
        disabled={isInDefaultPosition}
        onDragRelease={handleDrag}
        onInitialLayout={handleDrag}
      >
        {touchableComponent()}
      </Draggable>
    </View>
  ) : (
    touchableComponent()
  );
}

export default SoundButton;
