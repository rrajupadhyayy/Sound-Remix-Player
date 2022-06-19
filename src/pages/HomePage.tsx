import SoundButton from 'components/SoundButton/SoundButton';
import globalStyles from 'config/globalStyles';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CircularProgress, {
  CircularProgressBase,
} from 'react-native-circular-progress-indicator';

function HomePage() {
  const [value, setValue] = useState(10);

  useEffect(() => {
    if (value !== 100) {
      setValue(value + 10);
    }
  }, [value]);

  const props = {
    activeStrokeWidth: 5,
    inActiveStrokeWidth: 5,
    inActiveStrokeOpacity: 0.2,
  };

  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      {/* <SoundButton /> */}
      <CircularProgressBase
        initialValue={0}
        value={value}
        duration={3000}
        {...props}
      >
        <Text>test</Text>
      </CircularProgressBase>
    </View>
  );
}

export default HomePage;
