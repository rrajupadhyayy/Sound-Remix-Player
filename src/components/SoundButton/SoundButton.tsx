import Draggable from 'components/Draggable/Draggable';
import globalStyles from 'config/globalStyles';
import React, { Fragment, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { getScreenHeight } from 'utils/screen-size';
import styles from './SoundButton.styles';

export const animationState = {
  duration: 500,
  useNativeDriver: true,
};

function SoundButton() {
  const [isInDefaultPosition, setIsDefaultPosition] = useState<boolean>(true);

  return (
    <View
      style={[globalStyles.container, { opacity: 1 }]}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        console.log('height:', { layout });
        console.log('width:', layout.width);
        console.log('x:', layout.x);
        console.log('y:', layout.y);
      }}
    >
      <Draggable
        x={75}
        minX={75}
        maxX={75}
        y={isInDefaultPosition ? getScreenHeight(80) : getScreenHeight(70)}
        maxY={getScreenHeight(70)}
        minY={getScreenHeight(20)}
        disabled={isInDefaultPosition}
        onDragRelease={(e) => console.log(e.nativeEvent.locationY)}
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
