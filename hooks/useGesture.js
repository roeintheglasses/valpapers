import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";

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

export function useTapGesture() {
  const tapScale = useSharedValue(1);
  const tapOpacity = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      tapScale.value = withTiming(0.9);
      tapOpacity.value = withTiming(0.5);
    })
    .onEnd(() => {
      tapScale.value = withTiming(1);
      tapOpacity.value = withTiming(1);
    });
  return { tapScale, tapOpacity, tapGesture };
}
