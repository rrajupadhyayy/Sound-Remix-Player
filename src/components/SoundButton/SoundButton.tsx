// Common sound button component

import Draggable from 'components/Draggable/Draggable';
import { globalStyles } from 'config';
import useLoader, { LoadingState } from 'hooks/useLoader';
import { useSoundPlayer, loadSound } from 'hooks/useSoundPlayer';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styles, { generateAbsoluteStyle } from './SoundButton.styles';
import {
  commonDraggableProps,
  commonProgressProps,
  generateAudioRanges,
  getSoundIconColor,
  soundIconSize,
} from './SoundButton.utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { SoundButtonProps } from './SoundButton.types';

// Initialzing outside the render function to avoid unecessary recalculation
const rangeArray = generateAudioRanges();

function SoundButton({
  fileName,
  downloadLink,
  distanceFromLeft,
  iconName,
}: SoundButtonProps) {
  const [isInDefaultPosition, setIsInDefault] = useState<boolean>(true);
  // state to toggle between sound playing/stopped state
  const { loadingStatus, loaderFunction } = useLoader();
  const isLoading = loadingStatus === LoadingState.LOADING;
  const { soundRef, loadingPercentage, setLoadingPercentage } = loadSound({
    fileName,
    downloadLink,
    loaderFunction,
  });
  // soundRef and loading percentage if file is downloading

  const { playSound, stopSound, setSoundVolume } = useSoundPlayer(soundRef);
  // initialize sound methds

  const onPlay = () => {
    setIsInDefault(false);
    playSound();
  };

  const onStop = () => {
    setIsInDefault(true);
    stopSound();
  };

  // function check if the component position lies between one of the range values
  const handleDrag = (position?: string) => {
    if (position) {
      const top = Number(position) !== 0 ? Number(position) * -1 : 0;
      let volume = 0.1;
      rangeArray.forEach((item) => {
        if (item.minLimit <= top && top < item.maxLimit) {
          volume = item.volume;
        }
      });
      setSoundVolume(volume);
    }
  };

  const iconComponent = () => {
    return (
      <Icon
        name={iconName}
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
          isInDefaultPosition &&
            generateAbsoluteStyle(
              distanceFromLeft,
              !isLoading && loadingPercentage === 0,
            ),
        ]}
        disabled={isLoading}
        onPress={isInDefaultPosition ? onPlay : onStop}
        activeOpacity={0.7}
      >
        {/* only triggere progress bar component when file is to be downloaded */}
        {isInDefaultPosition && loadingPercentage > 0 ? (
          <CircularProgressBase
            key={fileName}
            {...commonProgressProps}
            value={loadingPercentage}
            onAnimationComplete={() => setLoadingPercentage(0)}
            // set to 0  after completion to dismount circular progress bar component
          >
            {iconComponent()}
          </CircularProgressBase>
        ) : (
          iconComponent()
        )}
      </TouchableOpacity>
    );
  };

  return !isInDefaultPosition ? (
    <Draggable
      {...commonDraggableProps}
      x={distanceFromLeft}
      disabled={isInDefaultPosition}
      onDragRelease={handleDrag}
      onInitialLayout={handleDrag}
    >
      {touchableComponent()}
    </Draggable>
  ) : (
    touchableComponent()
  );
}

export default SoundButton;
