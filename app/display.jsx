import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

import { View, Dimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import usePinchGesture from "@hooks/usePinchGesture";
import getRandomBlurHash from "@lib/getRandomBlurHash";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

export default function Display() {
  const wallpaperBlurHash = getRandomBlurHash();

  const local = useLocalSearchParams();
  const { uri: imageUri } = local;

  const { scale, focalX, focalY, pinchGesture } = usePinchGesture();

  const animatedStyle = useAnimatedStyle(() => {
    const adjustX = focalX.value - screenWidth / 2;
    const adjustY = focalY.value - screenHeight / 3 / 2; // Assuming the image takes up 1/3 of the screen height initially

    return {
      transform: [
        { translateX: adjustX * (1 - scale.value) },
        { translateY: adjustY * (1 - scale.value) },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <View style={styles.container} className="bg-main">
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[animatedStyle]}>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              placeholder={wallpaperBlurHash}
              contentFit="contain"
              recyclingKey={`display-image-${imageUri}`}
            />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
async function DownloadImage(fileName, imageUri) {
  let fileUri = FileSystem.documentDirectory + fileName;
  try {
    const res = await FileSystem.downloadAsync(imageUri, fileUri);
    SaveFileToGallery(res.uri);
  } catch (err) {
    console.log("FS Err: ", err);
  }
}

async function SaveFileToGallery(fileUri) {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status === "granted") {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Valpapers");
      if (album === null) {
        await MediaLibrary.createAlbumAsync("Valpapers", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (err) {
      console.log("Save err: ", err);
    }
  } else if (status === "denied") {
    alert("please allow permissions to download");
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    height: screenHeight - 160,
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: screenWidth,
  },
});
