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
import { Link, useLocalSearchParams } from "expo-router";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { Dialog } from "@rneui/themed";
import { usePinchGesture, useTapGesture } from "@hooks/useGesture";
import getRandomBlurHash from "@lib/getRandomBlurHash";

import { setWallpaper } from "../modules/expo-wallpaper";

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
    itemData && itemData.uuid ? "80%" : "80%";

  const { scale, focalX, focalY, pinchGesture } = usePinchGesture();
  const { tapGesture, tapOpacity, tapScale } = useTapGesture();
  const {
    tapGesture: downloadTapGesture,
    tapOpacity: downloadTapOpacity,
    tapScale: downloadTapScale,
  } = useTapGesture();

  const animatedSaveStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: tapScale.value }],
      opacity: tapOpacity.value,
    };
  });

  const animatedDownloadStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: downloadTapScale.value }],
      opacity: downloadTapOpacity.value,
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

  const onSetWallpaperPress = async (type) => {
    let fileUri = FileSystem.documentDirectory + fileName;
    try {
      toggleAlert();
      const res = await FileSystem.downloadAsync(imageUri, fileUri);
      const options = { uri: res.uri, type };
      const result = setWallpaper(options);
      console.log(result);
      showToast("Wallpaper Updated!");
    } catch (err) {
      console.log("FS Err: ", err);
    }
    // console.log("hello");
  };

  return (
    <View className="flex-1 justify-evenly items-center bg-main">
      <View style={styles.goBackView}>
        <MCI
          name="arrow-left"
          size={18}
          color="#fff"
          style={{ paddingTop: 2 }}
        />
        <Link href={"/"} className="text-white font-poppinsBold text-xl">
          Home
        </Link>
      </View>
      <Dialog
        style={{ color: "#1c2227" }}
        isVisible={visible}
        onBackdropPress={toggleAlert}
      >
        <Dialog.Title
          titleStyle={{ color: "#1c2227", textAlign: "center" }}
          title="Set Wallpaper"
        />
        <Dialog.Actions>
          <Dialog.Button
            title="Set Homescreen Wallpaper"
            type="solid"
            containerStyle={{ width: "100%" }}
            buttonStyle={{
              backgroundColor: "#ff4655",
              borderRadius: 50,
              marginVertical: 2,
            }}
            onPress={() => onSetWallpaperPress("screen")}
          />
          <Dialog.Button
            title="Set Lockscreen Wallpaper"
            type="solid"
            containerStyle={{ width: "100%" }}
            buttonStyle={{
              backgroundColor: "#ff4655",
              borderRadius: 50,
              marginVertical: 2,
            }}
            onPress={() => onSetWallpaperPress("lock")}
          />
          <Dialog.Button
            title="Set Both"
            type="solid"
            containerStyle={{ width: "100%" }}
            buttonStyle={{
              backgroundColor: "#ff4655",
              borderRadius: 50,
              marginVertical: 2,
            }}
            onPress={() => onSetWallpaperPress("both")}
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

      <View
        style={{ flexDirection: "row" }}
        className="justify-evenly items-center w-full"
      >
        <GestureDetector gesture={tapGesture}>
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
        </GestureDetector>
        <GestureDetector gesture={downloadTapGesture}>
          <Pressable onPress={onSavePress}>
            <Animated.View
              className="bg-highlight-prime px-8 py-2 rounded-xl"
              style={[styles.button, animatedDownloadStyles]}
            >
              <Text className="text-white font-poppinsBold text-l">
                Download
              </Text>
            </Animated.View>
          </Pressable>
        </GestureDetector>
      </View>
    </View>
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
      showToast("Wallpaper Saved!");
    } catch (err) {
      console.log("Save err: ", err);
    }
  } else if (status === "denied") {
    alert("please allow permissions to download");
  }
}

function showToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
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
  button: {
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  goBackView: {
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
    width: 108,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
