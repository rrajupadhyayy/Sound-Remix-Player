import { COLORS, Icons } from 'config';
import { downloadLinks } from 'services/download.constants';
import { getScreenHeight, getScreenWidth } from 'utils/screen-size';
import { SoundButtonProps, SoundFileNames } from './SoundButton.types';

// some common props and constants defined
export const defaultButtonSize = getScreenWidth(19);

export const commonDraggableProps = {
  y: getScreenHeight(70),
  maxY: getScreenHeight(70),
  minY: getScreenHeight(10),
};

export const commonProgressProps = {
  initialValue: 0,
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

// Since the the button movement ranges between 0 - screenHeight(60)
// this function creates an array of ranges for min/max and update volume accordingly
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
    // Adding extra limit just incase some miscalculation from panresponder to the upper limit
  });
  return rangeArray;
};

const soundArray = [
  {
    fileName: SoundFileNames.RAIN,
    downloadLink: downloadLinks.RAIN,
    iconName: Icons.WATER,
  },
  {
    fileName: SoundFileNames.WIND,
    downloadLink: downloadLinks.WIND,
    iconName: Icons.WIND,
  },
  {
    fileName: SoundFileNames.THUNDER,
    downloadLink: downloadLinks.THUNDER,
    iconName: Icons.THUNDER,
  },
  {
    fileName: SoundFileNames.LEAVES,
    downloadLink: downloadLinks.LEAVES,
    iconName: Icons.LEAVES,
  },
];

// function to generate x co ordinates for the sound buttons to be displayed
export const generateSoundDisplayArray = () => {
  const totalWidthOfButtons = defaultButtonSize * soundArray.length;
  const remainingTotalSpace = getScreenWidth(100) - totalWidthOfButtons;
  const defaultSpacingBetweenButtons = Math.round(
    remainingTotalSpace / (soundArray.length + 1),
  );

  const soundButtonDisplayArray = [];
  for (let index = 1; index < soundArray.length + 1; index++) {
    const element: SoundButtonProps = {
      ...soundArray[index - 1],
      distanceFromLeft:
        defaultSpacingBetweenButtons * index + defaultButtonSize * (index - 1),
    };
    soundButtonDisplayArray.push(element);
  }
  return soundButtonDisplayArray;
};
