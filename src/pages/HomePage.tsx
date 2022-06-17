import globalStyles from 'config/globalStyles';
import { staticText } from 'config/staticText';
import React from 'react';
import { Text, View } from 'react-native';

function HomePage() {
  return (
    <View style={[globalStyles.container, globalStyles.alignCenter]}>
      <Text>{staticText.appName}</Text>
    </View>
  );
}

export default HomePage;
