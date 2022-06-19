// Constant file to store the font styles

import { StyleSheet } from 'react-native';
import { getScreenWidth } from 'utils/screen-size';
import { COLORS } from './colorPallete';

const typography = StyleSheet.create({
  appTitle: {
    fontSize: getScreenWidth(7),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_WHITE,
  },
});

export default typography;
