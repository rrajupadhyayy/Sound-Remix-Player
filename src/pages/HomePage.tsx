import { useNetInfo } from '@react-native-community/netinfo';
import SoundButton from 'components/SoundButton/SoundButton';
import { generateSoundDisplayArray } from 'components/SoundButton/SoundButton.utils';
import {
  LinearGradientColors,
  globalStyles,
  staticText,
  typography,
} from 'config';
import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function HomePage() {
  useNetInfo();
  const soundButtonDisplayArray = generateSoundDisplayArray();
  return (
    <LinearGradient
      style={[
        globalStyles.container,
        globalStyles.alignCenter,
        globalStyles.flexRow,
      ]}
      colors={LinearGradientColors}
    >
      <Text style={typography.appTitle}>{staticText.homeTitle}</Text>
      {soundButtonDisplayArray.map((item, index) => {
        const { fileName, downloadLink, distanceFromLeft, iconName } = item;
        return (
          <SoundButton
            key={`${fileName}-${index}`}
            fileName={fileName}
            downloadLink={downloadLink}
            distanceFromLeft={distanceFromLeft}
            iconName={iconName}
          />
        );
      })}
    </LinearGradient>
  );
}

export default HomePage;
