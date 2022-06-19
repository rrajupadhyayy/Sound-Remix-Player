// Screen helper file to determine screenWidth and screenHeight
import { Dimensions, PixelRatio } from 'react-native';

const getScreenWidth = (widthPercent: string | number) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const getScreenHeight = (heightPercent: string | number) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export { getScreenWidth, getScreenHeight };
