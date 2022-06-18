import React from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { HomePage } from './src/pages';
import globalStyles from './src/config/globalStyles';

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <HomePage />
    </SafeAreaView>
  );
}
