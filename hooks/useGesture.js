import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

/**
 * Hook that handles pinch gesture and returns values for scale,
 * focal point, and gesture handler.
 *
 * Sets up a Gesture.Pinch gesture handler and returns values for
 * scale, focalX, focalY which are updated on gesture events.
 * Also returns the pinchGesture handler.
 *
 * Smoothly animates scale back to 1 on gesture end.
 */
export function usePinchGesture() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onStart((event) => {
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1); // Smoothly animate back to original scale
    });
  return { focalX, focalY, scale, pinchGesture };
}

/**
 * Hook that handles tap gesture and returns values for scale,
 * opacity, and gesture handler.
 *
 * Sets up a Gesture.Tap gesture handler and returns values for
 * tapScale, tapOpacity which are animated on tap events.
 * Also returns the tapGesture handler.
 */
export function useTapGesture() {
  const tapScale = useSharedValue(1);
  const tapOpacity = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      tapScale.value = withTiming(0.9, {
        duration: 400,
        easing: Easing.elastic(2),
        reduceMotion: ReduceMotion.Never,
      });
      tapOpacity.value = withTiming(0.8, {
        duration: 400,
        easing: Easing.elastic(2),
        reduceMotion: ReduceMotion.Never,
      });
    })
    .onEnd(() => {
      tapScale.value = withTiming(1, {
        duration: 400,
        easing: Easing.elastic(2),
        reduceMotion: ReduceMotion.Never,
      });
      tapOpacity.value = withTiming(1, {
        duration: 400,
        easing: Easing.elastic(2),
        reduceMotion: ReduceMotion.Never,
      });
    });
  return { tapScale, tapOpacity, tapGesture };
}
