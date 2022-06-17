import Draggable from 'components/Draggable/Draggable';
import globalStyles from 'config/globalStyles';
import React, { Fragment, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { getScreenHeight, getScreenWidth } from 'utils/screen-size';
import styles from './SoundButton.styles';

export const animationState = {
  duration: 500,
  useNativeDriver: true,
};

function SoundButton() {
  const [isInDefaultPosition, setIsDefaultPosition] = useState<boolean>(true);
  console.log(getScreenHeight(10), getScreenHeight(70));

  return isInDefaultPosition ? (
    <TouchableOpacity
      style={[
        styles.absoluteButton,
        globalStyles.alignCenter,
        globalStyles.boxShadow,
        styles.buttonContainer,
      ]}
      onPress={() => setIsDefaultPosition(!isInDefaultPosition)}
    >
      <Text>test</Text>
    </TouchableOpacity>
  ) : (
    <View style={[globalStyles.container]}>
      <Draggable
        x={75}
        minX={75}
        maxX={75}
        y={isInDefaultPosition ? getScreenHeight(70) : getScreenHeight(60)}
        maxY={getScreenHeight(70)}
        minY={getScreenHeight(10)}
        disabled={isInDefaultPosition}
        onDragRelease={(e) => console.log({ e })}
      >
        <TouchableOpacity
          style={[
            globalStyles.alignCenter,
            styles.buttonContainer,
            globalStyles.boxShadow,
          ]}
          activeOpacity={0.72}
          onPress={() => setIsDefaultPosition(!isInDefaultPosition)}
        >
          <Text>test</Text>
        </TouchableOpacity>
      </Draggable>
    </View>
  );
}

export default SoundButton;
