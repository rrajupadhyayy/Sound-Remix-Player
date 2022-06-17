import React from 'react';
import { LogBox } from 'react-native';
import { HomePage } from './src/pages';

export default function App() {
  LogBox.ignoreAllLogs(true);
  return <HomePage />;
}
