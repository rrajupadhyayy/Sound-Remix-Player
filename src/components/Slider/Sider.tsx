import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  PanResponderCallbacks,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomSlider() {
  // ------------------ OPTIONS ------------------------ //
  // (Use props._VALUE_ in this section if needed)
  const name = 'Price';
  const icon = 'ticket-percent-outline';
  const minBoundary = 0;
  const maxBoundary = 99;
  const initVal = 12;
  const colorHighlight = '#008ee6';

  // ----------------- Slider ----------------------- //
  const pan = useRef(new Animated.ValueXY()).current;
  const [_forceRender, setForceRender] = useState(0);
  const animState = useRef({
    displayMinVal: 0,
    sliderHeight: 0,
    sliderWidth: 0,
    stepWidth: 0,
    minBoundary: 0,
    maxBoundary: 0,
    minBoundaryPosition: 0,
    maxBoundaryPosition: 0,
    offSet: 0,
    clampOffSet: 0,
    initOffSet: 0,
  }).current;

  const [sliderCenter, setSliderCenter] = useState(0);
  const [initOffset, setInitOffset] = useState(0);
  const [minBoundaryPosition, setMinBoundaryPosition] = useState(0);
  const [maxBoundaryPosition, setMaxBoundaryPosition] = useState(0);
  const setSliderSize = (height: number, width: number) => {
    const sWidth = width - height; // - height : Avoid the slider to overlap the borders
    animState.sliderHeight = height;
    animState.sliderWidth = sWidth;
    const stepWidth = sWidth / (maxBoundary - minBoundary);
    animState.stepWidth = stepWidth;
    animState.minBoundary = minBoundary;
    animState.maxBoundary = maxBoundary;

    const center = sWidth / 2;
    setSliderCenter(center);
    const initOff = (initVal - (maxBoundary - minBoundary) / 2) * stepWidth;
    setInitOffset(initOff);
    animState.initOffSet = initOff;
    animState.minBoundaryPosition = -sWidth / 2 - initOff;
    animState.maxBoundaryPosition = sWidth / 2 - initOff;
    setMinBoundaryPosition(-sWidth / 2 - initOff);
    setMaxBoundaryPosition(sWidth / 2 - initOff);

    placeSlider();
  };

  const placeSlider = () => {
    const newVal =
      // @ts-ignore
      pan.x._value +
      animState.offSet +
      animState.initOffSet -
      animState.clampOffSet;
    setForceRender(newVal); // Update the state so the render function is called (and elements are updated on screen)

    let filterVal = Math.trunc(
      (newVal + animState.sliderWidth / 2 + animState.stepWidth / 2) /
        animState.stepWidth,
    );
    filterVal = Math.min(maxBoundary, filterVal);
    filterVal = Math.max(minBoundary, filterVal);
    animState.displayMinVal = filterVal;
  };

  const getPanResponder = () => {
    return PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const clamp = Math.max(
          animState.minBoundaryPosition,
          // @ts-ignore
          Math.min(animState.maxBoundaryPosition, pan.x._value),
        );
        // @ts-ignore
        animState.clampOffSet = animState.clampOffSet + pan.x._value - clamp;
        pan.setOffset({ x: clamp, y: 0 });
      },
      onPanResponderMove: (e, gesture) => {
        placeSlider();
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, {
          dx: gesture.dx,
          dy: 0,
        });
      },
      onPanResponderRelease: () => {
        // @ts-ignore
        animState.offSet = animState.offSet + pan.x._value;
        pan.flattenOffset();
      },
    } as PanResponderCallbacks);
  };
  const [panResponder] = useState(getPanResponder());
  // ----------------- Render ----------------------- //
  return (
    <View style={s.mainContainer}>
      <View style={s.container}>
        <View
          style={s.sliderContainer}
          onLayout={(event) =>
            setSliderSize(
              event.nativeEvent.layout.height,
              event.nativeEvent.layout.width,
            )
          }
        >
          <Animated.View
            style={[
              s.draggable,
              {
                transform: [
                  {
                    translateX: pan.x.interpolate({
                      inputRange: [
                        Math.min(minBoundaryPosition, maxBoundaryPosition),
                        Math.max(minBoundaryPosition, maxBoundaryPosition),
                      ],
                      outputRange: [
                        Math.min(minBoundaryPosition, maxBoundaryPosition),
                        Math.max(minBoundaryPosition, maxBoundaryPosition),
                      ],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
              { left: sliderCenter + initOffset },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={s.circle}>
              <MaterialCommunityIcons
                name={icon}
                size={25}
                color={colorHighlight}
              />
            </View>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
