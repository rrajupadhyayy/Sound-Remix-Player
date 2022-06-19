import SoundButton from 'components/SoundButton/SoundButton';
import { generateSoundDisplayArray } from 'components/SoundButton/SoundButton.utils';
import { LinearGradientColors } from 'config/colorPallete';
import globalStyles from 'config/globalStyles';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

function HomePage() {
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
