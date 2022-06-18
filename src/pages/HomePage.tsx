import SoundButton from 'components/SoundButton/SoundButton';
import globalStyles from 'config/globalStyles';
import React from 'react';
import { View } from 'react-native';

function HomePage() {
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <SoundButton />
    </View>
  );
}

export default HomePage;
