import React from "react";
import { View, Dimensions } from "react-native";
import { Image } from "expo-image";
import getRandomBlurHash from "@lib/getRandomBlurHash";
import { useLocalSearchParams } from "expo-router";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

export default function Display() {
  const wallpaperBlurHash = getRandomBlurHash();
  const local = useLocalSearchParams();
  const { uri: imageUri } = local;

  const scale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = 1;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{ height: screenHeight - 160, width: screenWidth }}
        className="bg-main"
      >
        <GestureDetector gesture={pinchGesture}>
          <Animated.View
            style={[
              { alignItems: "center", justifyContent: "center" },
              animatedStyle,
            ]}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                height: screenHeight / 3,
                width: "100%",
                borderRadius: 10,
              }}
              placeholder={wallpaperBlurHash}
              contentFit="contain"
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
