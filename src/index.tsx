import React from 'react';
import { Text, View } from 'react-native';
import Testing from 'components/test';

function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>index</Text>
      <Testing />
    </View>
  );
}

export default Index;
