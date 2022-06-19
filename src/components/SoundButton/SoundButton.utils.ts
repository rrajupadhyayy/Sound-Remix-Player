import { COLORS } from 'config/colorPallete';
import { Icons } from 'config/icons';
import { downloadLinks } from 'services/download.constants';
import { getScreenHeight, getScreenWidth } from 'utils/screen-size';
import { SoundButtonProps, SoundFileNames } from './SoundButton.types';

export const defaultSpacingBetweenButtons = getScreenWidth(4);
export const defaultButtonSize = getScreenWidth(19);

export const commonDraggableProps = {
  y: getScreenHeight(70),
  maxY: getScreenHeight(70),
  minY: getScreenHeight(10),
};

export const commonProgressProps = {
  duration: 2000,
  activeStrokeWidth: 3,
  activeStrokeColor: COLORS.PRIMARY_WHITE,
  inActiveStrokeOpacity: 0,
  radius: getScreenWidth(9.5),
};

export const soundIconSize = getScreenHeight(4);

export const getSoundIconColor = (isInDefaultPlace: boolean) => {
  return isInDefaultPlace ? COLORS.PRIMARY_WHITE : COLORS.PURPLE;
};

export const generateAudioRanges = () => {
  const maximumRange = getScreenHeight(60);
  const minimumRange = getScreenHeight(6);
  const rangeArray = [];
  for (let index = 1; index < 10; index++) {
    const element = {
      volume: Number(`0.${index}`),
      minLimit: minimumRange * (index - 1),
      maxLimit: minimumRange * index,
    };
    rangeArray.push(element);
  }
  rangeArray.push({
    volume: 1,
    minLimit: maximumRange - minimumRange,
    maxLimit: maximumRange + getScreenHeight(10),
  });
  return rangeArray;
};

const soundArray = [
  {
    fileName: SoundFileNames.RAIN,
    downloadLink: downloadLinks.RAIN,
    iconName: Icons.WATER,
    distanceFromLeft: defaultSpacingBetweenButtons,
  },
  {
    fileName: SoundFileNames.WIND,
    downloadLink: downloadLinks.WIND,
    iconName: Icons.WIND,
    distanceFromLeft: defaultSpacingBetweenButtons * 2 + defaultButtonSize,
  },
  {
    fileName: SoundFileNames.THUNDER,
    downloadLink: downloadLinks.THUNDER,
    iconName: Icons.THUNDER,
    distanceFromLeft: defaultSpacingBetweenButtons * 3 + defaultButtonSize * 2,
  },
  {
    fileName: SoundFileNames.LEAVES,
    downloadLink: downloadLinks.LEAVES,
    iconName: Icons.LEAVES,
    distanceFromLeft: defaultSpacingBetweenButtons * 4 + defaultButtonSize * 3,
  },
];

export const generateSoundDisplayArray = () => {
  const soundButtonDisplayArray = [];
  for (let index = 1; index < 5; index++) {
    const element: SoundButtonProps = {
      ...soundArray[index - 1],
      distanceFromLeft:
        defaultSpacingBetweenButtons * index + defaultButtonSize * (index - 1),
    };
    soundButtonDisplayArray.push(element);
  }
  return soundButtonDisplayArray;
};
