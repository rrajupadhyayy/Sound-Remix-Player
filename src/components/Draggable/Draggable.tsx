// Made with reference to https://github.com/tongyy/react-native-draggable
// The original library has many unrequired features and is not compatible with the latest version of RN and TS.
// User Touch events are being handled with the help  of panresponder'

import { emptyFunction } from 'utils/error-handling';
import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ViewStyle,
} from 'react-native';
import { DraggableProps } from './Draggable.types';

// function to calculate if the component can move ahead/behind its current co ordinate
function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export default function Draggable({
  children,
  shouldReverse = false,
  disabled = false,
  animatedViewProps,
  touchableOpacityProps,
  onDrag = emptyFunction,
  onDragRelease = emptyFunction,
  onRelease = emptyFunction,
  x = 0,
  y = 0,
  z = 1,
  minY,
  maxY,
  onInitialLayout,
}: DraggableProps) {
  const minX = x;
  const maxX = x;
  // The Animated object housing our xy value so that we can spring back
  const pan = useRef(new Animated.ValueXY());
  // Always set to xy value of pan, would like to remove
  const offsetFromStart = useRef({ x: 0, y: 0 });
  // Top/Left/Right/Bottom location on screen from start of most recent touch
  const startBounds = useRef({ top: 0, bottom: 0, left: 0, right: 0 });
  // Whether we're currently dragging or not
  const isDragging = useRef(false);

  // get screen position and component position
  const getBounds = useCallback(() => {
    const left = x! + offsetFromStart.current.x;
    const top = y! + offsetFromStart.current.y;
    return {
      left,
      top,
      right: left,
      bottom: top,
    };
  }, [x, y]);

  const shouldStartDrag = useCallback(
    (gs: { dx: number; dy: number }) => {
      return !disabled && (Math.abs(gs.dx) > 2 || Math.abs(gs.dy) > 2);
    },
    [disabled],
  );

  const reversePosition = useCallback(() => {
    Animated.spring(pan.current, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }, [pan]);

  // listener to respond the current position of the component ( to manage volume )
  const onLayoutChange = () => {
    const position = pan.current.getLayout();
    const top = JSON.stringify(position['top']);
    return top;
  };

  const onPanResponderRelease = useCallback(
    (e: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
      isDragging.current = false;
      const position = onLayoutChange();
      if (onDragRelease) {
        onDragRelease(position);
        if (onRelease) {
          onRelease(e, true);
        }
      }
      if (!shouldReverse) {
        pan.current.flattenOffset();
      } else {
        reversePosition();
      }
    },
    [onDragRelease, shouldReverse, onRelease, reversePosition],
  );

  const onPanResponderGrant = useCallback(() => {
    startBounds.current = getBounds();
    isDragging.current = true;
    if (!shouldReverse) {
      pan.current.setOffset(offsetFromStart.current);
      pan.current.setValue({ x: 0, y: 0 });
    }
  }, [getBounds, shouldReverse]);

  const handleOnDrag = useCallback(
    (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const { dx, dy } = gestureState;
      const { top, right, left, bottom } = startBounds.current;
      const far = 999999999;
      const changeX = clamp(
        dx,
        Number.isFinite(minX) ? minX! - left : -far,
        Number.isFinite(maxX) ? maxX! - right : far,
      );
      const changeY = clamp(
        dy,
        Number.isFinite(minY) ? minY! - top : -far,
        Number.isFinite(maxY) ? maxY! - bottom : far,
      );
      pan.current.setValue({ x: changeX, y: changeY });
      onDrag!(e, gestureState);
    },
    [maxX, maxY, minX, minY, onDrag],
  );

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        shouldStartDrag(gestureState),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        shouldStartDrag(gestureState),
      onPanResponderGrant,
      onPanResponderMove: Animated.event([], {
        listener: handleOnDrag as (
          event: NativeSyntheticEvent<NativeTouchEvent>,
        ) => void,
        useNativeDriver: false,
      }),
      onPanResponderRelease,
    });
  }, [
    handleOnDrag,
    onPanResponderGrant,
    onPanResponderRelease,
    shouldStartDrag,
  ]);

  useEffect(() => {
    const curPan = pan.current; // Using an instance to avoid losing the pointer before the cleanup
    if (!shouldReverse) {
      curPan.addListener((c) => (offsetFromStart.current = c));
    }
    return () => {
      curPan.removeAllListeners();
    };
  }, [shouldReverse]);

  const positionCss: StyleProp<ViewStyle> = useMemo(() => {
    const Window = Dimensions.get('window');
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: Window.width,
      height: Window.height,
    };
  }, []);

  const dragItemCss = useMemo(() => {
    const style: StyleProp<ViewStyle> = {
      top: y,
      left: x,
      elevation: z,
      zIndex: z,
    };

    if (children) {
      return {
        ...style,
        alignSelf: 'baseline',
      };
    }
    return {
      ...style,
      justifyContent: 'center',
    };
  }, [children, x, y, z]);

  return (
    <View pointerEvents="box-none" style={positionCss}>
      <Animated.View
        pointerEvents="box-none"
        {...animatedViewProps}
        {...panResponder.panHandlers}
        style={pan.current.getLayout()}
        onLayout={() => {
          const position = onLayoutChange();
          onInitialLayout(position);
        }}
      >
        <View
          {...touchableOpacityProps}
          // @ts-expect-error
          style={dragItemCss}
          disabled={disabled}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
