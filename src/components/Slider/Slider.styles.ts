import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 4,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
    flex: 8,
  },
  draggable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    aspectRatio: 1,
    position: 'absolute',
    top: -5,
    borderRadius: 100,
    overflow: 'visible',
  },
  circle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 2.8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f1f1f1',
    overflow: 'visible',
    padding: 20,
  },
});

export default styles;
