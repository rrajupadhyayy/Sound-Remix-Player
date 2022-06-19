import { GestureResponderEvent, PanResponderGestureState } from "react-native";

export interface DraggableProps {
    children?: React.ReactNode;
    shouldReverse?: boolean;
    disabled?: boolean;
    animatedViewProps?: object;
    touchableOpacityProps?: object;
    onDrag?: (
      e: GestureResponderEvent,
      gestureState: PanResponderGestureState,
    ) => void;
    onDragRelease?: (position?: string) => void;
    onInitialLayout: (position?: string) => void;
    onRelease?: (event: GestureResponderEvent, wasDragging: boolean) => void;
    onReverse?: () => { x: number; y: number };
    x?: number;
    y?: number;
    z?: number;
    minY?: number;
    maxY?: number;
  }