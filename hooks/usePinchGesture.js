import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export default function usePinchGesture() {
  const scale = useSharedValue(1);
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = 1;
    });
  return { scale, pinchGesture };
}
