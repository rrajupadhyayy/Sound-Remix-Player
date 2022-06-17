import { COLORS } from 'config/colorPallete';
import { StyleSheet } from 'react-native';
import { getScreenHeight, getScreenWidth } from 'utils/screen-size';

const styles = StyleSheet.create({
  buttonContainer: {
    height: getScreenWidth(19),
    width: getScreenWidth(19),
    borderRadius: getScreenWidth(10),
    backgroundColor: 'orange'
  },
});

export default styles;
