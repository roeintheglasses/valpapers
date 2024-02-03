import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
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
    <GestureHandlerRootView style={styles.flexContainer}>
      <View style={styles.container} className="bg-main">
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[styles.centerContent, animatedStyle]}>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              placeholder={wallpaperBlurHash}
              contentFit="contain"
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    height: screenHeight - 160,
    width: screenWidth,
    alignItems: "start",
    justifyContent: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: screenHeight / 3,
    width: "100%",
    borderRadius: 10,
  },
});
