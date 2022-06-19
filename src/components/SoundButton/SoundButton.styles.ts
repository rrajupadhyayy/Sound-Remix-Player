import { COLORS } from 'config/colorPallete';
import { StyleSheet } from 'react-native';
import { getScreenHeight } from 'utils/screen-size';
import { defaultButtonSize } from './SoundButton.utils';

const styles = StyleSheet.create({
  buttonContainer: {
    height: defaultButtonSize,
    width: defaultButtonSize,
    borderRadius: defaultButtonSize / 2,
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  absoluteButton: {
    position: 'absolute',
    top: getScreenHeight(80),
    backgroundColor: COLORS.TRANSPARENT,
  },
});

export const generateAbsoluteStyle = (left: number) => {
  return {
    ...styles.absoluteButton,
    left,
  };
};

export default styles;
