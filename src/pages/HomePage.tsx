import SoundButton from 'components/SoundButton/SoundButton';
import { generateSoundDisplayArray } from 'components/SoundButton/SoundButton.utils';
import globalStyles from 'config/globalStyles';
import React from 'react';
import { View } from 'react-native';

function HomePage() {
  const soundButtonDisplayArray = generateSoundDisplayArray();
  return (
    <View
      style={[
        globalStyles.container,
        globalStyles.alignCenter,
        globalStyles.flexRow,
      ]}
    >
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
    </View>
  );
}

export default HomePage;
