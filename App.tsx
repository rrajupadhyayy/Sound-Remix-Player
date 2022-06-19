import React from 'react';
import { LogBox } from 'react-native';
import { HomePage } from './src/pages';

export default function App() {
  LogBox.ignoreAllLogs(true);
  // Added to avoid all yellow box errors during development
  return <HomePage />;
}
