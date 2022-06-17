import React from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { HomePage } from './src/pages';

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomePage />
    </SafeAreaView>
  );
}
