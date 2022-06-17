import { COLORS } from 'config/colorPallete';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  debugView: {
    backgroundColor: COLORS.ERROR,
    position: 'absolute',
    borderWidth: 4,
  },
});

export default styles;
