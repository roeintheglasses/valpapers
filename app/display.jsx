import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { View, Dimensions, StyleSheet, Button } from "react-native";
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
  const { uri: imageUri, item } = local;
  const itemData = JSON.parse(item);
  const fileName =
    itemData && itemData.uuid ? `${itemData.uuid}.png` : itemData.id;

  const { scale, focalX, focalY, pinchGesture } = usePinchGesture();

  const animatedStyle = useAnimatedStyle(() => {
    const adjustX = focalX.value - screenWidth / 2;
    const adjustY = focalY.value - screenHeight / 3; // Assuming the image takes up 1/3 of the screen height initially

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
      <View className="flex-1 justify-start items-center bg-main">
        <View style={styles.container}>
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
        <Button
          title="Save"
          style={styles.button}
          onPress={() => {
            DownloadImage(fileName, imageUri);
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}
async function DownloadImage(fileName, imageUri) {
  console.log("====================================");
  console.log(fileName);
  console.log("====================================");
  let fileUri = FileSystem.documentDirectory + fileName;
  try {
    const res = await FileSystem.downloadAsync(imageUri, fileUri);
    SaveFileToGallery(res.uri);
  } catch (err) {
    console.log("FS Err: ", err);
  }
}

async function SaveFileToGallery(fileUri) {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  console.log("====================================");
  console.log(fileUri);
  console.log("====================================");
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
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 50,
  },
  container: {
    height: "80%",
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: screenWidth,
  },
});
