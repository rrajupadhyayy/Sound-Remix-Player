import Draggable from 'components/Draggable/Draggable';
import globalStyles from 'config/globalStyles';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { getScreenHeight } from 'utils/screen-size';
import styles from './SoundButton.styles';

function SoundButton() {
  const [isInDefaultPosition, setIsDefaultPosition] = useState<boolean>(true);
  return (
    <Draggable
      x={75}
      minX={75}
      maxX={75}
      y={getScreenHeight(80)}
      maxY={getScreenHeight(80)}
      minY={getScreenHeight(10)}
    >
      <View
        style={[
          styles.buttonContainer,
          globalStyles.alignCenter,
          globalStyles.boxShadow,
        ]}
      >
        <Text>test</Text>
      </View>
    </Draggable>
  );
}

export default SoundButton;
