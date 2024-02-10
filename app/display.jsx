import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useState, useCallback } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  Text,
  ToastAndroid,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Dialog } from "@rneui/themed";
import {
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { usePinchGesture, useTapGesture } from "@hooks/useGesture";
import getRandomBlurHash from "@lib/getRandomBlurHash";

// import { setWallpaper, hello } from "../modules/expo-wallpaper";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

export default function Display() {
  const [visible, setVisible] = useState(false);
  const toggleAlert = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const wallpaperBlurHash = getRandomBlurHash();

  const local = useLocalSearchParams();
  const { uri: imageUri, item } = local;
  const itemData = JSON.parse(item);

  const fileName =
    itemData && itemData.uuid ? `${itemData.uuid}.png` : itemData.id;
  const wallpaperHeightBasedOnTypeType =
    itemData && itemData.uuid ? "80%" : "50%";

  const { scale, focalX, focalY, pinchGesture } = usePinchGesture();
  const { tapGesture, tapOpacity, tapScale } = useTapGesture();

  const animatedSaveStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: tapScale.value }],
      opacity: tapOpacity.value,
    };
  });

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

  const onSavePress = () => DownloadImage(fileName, imageUri);

  const onSetWallpaperPress = (type) => {
    hello();
  };

  return (
    <GestureHandlerRootView style={styles.flexContainer}>
      <View className="flex-1 justify-center items-center bg-main">
        <Dialog isVisible={visible} onBackdropPress={toggleAlert}>
          <Dialog.Title title="Set Wallpaper" />
          <Dialog.Actions>
            <Dialog.Button
              title="Set Homescreen Wallpaper"
              type="solid"
              containerStyle={{ width: "100%" }}
              onPress={() => onSetWallpaperPress(TYPE.HOME)}
            />
            <Dialog.Button
              title="Set Lockscreen Wallpaper"
              containerStyle={{ width: "100%" }}
              onPress={() => onSetWallpaperPress(TYPE.LOCK)}
            />
            <Dialog.Button
              title="Set Both"
              containerStyle={{ width: "100%" }}
              onPress={() => onSetWallpaperPress(TYPE.BOTH)}
            />
          </Dialog.Actions>
        </Dialog>

        <GestureDetector gesture={pinchGesture}>
          <Animated.View
            style={[
              animatedStyle,
              styles.container,
              { height: wallpaperHeightBasedOnTypeType },
            ]}
          >
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              placeholder={wallpaperBlurHash}
              contentFit="contain"
              recyclingKey={`display-image-${imageUri}`}
            />
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={tapGesture}>
          <View
            style={{ flexDirection: "row" }}
            className="justify-evenly items-center w-full"
          >
            <Pressable onPress={toggleAlert}>
              <Animated.View
                className="bg-highlight-prime px-8 py-2 rounded-xl"
                style={[styles.button, animatedSaveStyles]}
              >
                <Text className="text-white font-poppinsBold text-l">
                  Set Wallpaper
                </Text>
              </Animated.View>
            </Pressable>
            <Pressable onPress={onSavePress}>
              <Animated.View
                className="bg-highlight-prime px-8 py-2 rounded-xl"
                style={[styles.button, animatedSaveStyles]}
              >
                <Text className="text-white font-poppinsBold text-l">
                  Download
                </Text>
              </Animated.View>
            </Pressable>
          </View>
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
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Valpapers");
      if (album === null) {
        await MediaLibrary.createAlbumAsync("Valpapers", asset, true);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
      }
    } catch (err) {
      console.log("Save err: ", err);
    }
  } else if (status === "denied") {
    alert("please allow permissions to download");
  }
}

function showToast() {
  ToastAndroid.show("Wallpaper Updated", ToastAndroid.SHORT);
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  button: {
    alignItems: "center", // Add this to center the text horizontally
    justifyContent: "center",
  },
  container: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  image: {
    height: "100%",
    width: screenWidth,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
