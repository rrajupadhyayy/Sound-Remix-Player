import { COLORS } from 'config/colorPallete';
import { StyleSheet } from 'react-native';
import { getScreenHeight, getScreenWidth } from 'utils/screen-size';

const styles = StyleSheet.create({
  buttonContainer: {
    height: getScreenWidth(19),
    width: getScreenWidth(19),
    borderRadius: getScreenWidth(10),
    backgroundColor: COLORS.PRIMARY_WHITE,
  },
  absoluteButton: {
    position: 'absolute',
    top: getScreenHeight(80),
    left: getScreenWidth(4),
    backgroundColor: COLORS.TRANSPARENT,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY_WHITE,
  },
});

export default styles;
