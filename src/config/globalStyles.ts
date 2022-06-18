import { StyleSheet } from 'react-native';
import { getScreenHeight, getScreenWidth } from 'utils/screen-size';
import { COLORS } from './colorPallete';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PURPLE,
    width: getScreenWidth(100),
    height: getScreenHeight(100),
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxShadow: {
    shadowColor: COLORS.BOX_SHADOW,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  rowAlignAtEnds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  absoluteCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flexRowReverse: {
    flexDirection: 'row-reverse',
  },
  transparentBg: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  absoluteFlex: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.PURPLE,
  },
});

export default globalStyles;
