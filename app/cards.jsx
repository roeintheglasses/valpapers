import { View, Dimensions, TouchableOpacity } from "react-native";

import { MasonryFlashList } from "@shopify/flash-list";
import { PLAYER_CARDS } from "../data/assetList.json";
import { Image } from "expo-image";
import getRandomBlurHash from "@lib/getRandomBlurHash";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

export default function CommunityValpapers() {
  return (
    <View className="flex-1 items-start justify-start bg-main px-2">
      <View
        className="px-2"
        style={{ height: screenHeight - 155, width: screenWidth }}
      >
        <MasonryFlashList
          data={PLAYER_CARDS}
          keyExtractor={(item, index) => {
            return item.id + index.toString();
          }}
          renderItem={PlayerCardItem}
          estimatedItemSize={screenHeight / 4}
          numColumns={3}
        />
      </View>
    </View>
  );
}

function PlayerCardItem({ item, index }) {
  const wallpaperBlurHash = getRandomBlurHash();
  return (
    <TouchableOpacity
      style={{
        height: screenHeight / 3.5,
        borderRadius: 10,
        aspectRatio: "9/21",
        alignItems: "center",
        paddingVertical: 6,
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 10,
        }}
        placeholder={wallpaperBlurHash}
      />
    </TouchableOpacity>
  );
}
