import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { COMMUNITY_WALLPAPERS } from "@data/assetList.json";
import { Image } from "expo-image";
import getRandomBlurHash from "@lib/getRandomBlurHash";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

export default function CommunityValpapers() {
  return (
    <View className="flex-1 items-start justify-start bg-main px-2">
      {/* <Text
        style={{ paddingHorizontal: 12, paddingBottom: 5 }}
        className="font-poppinsBold text-2xl text-slate-200"
      >
        Community Valpapers
      </Text> */}
      <View
        className="px-2"
        style={{ height: screenHeight - 150, width: screenWidth }}
      >
        <MasonryFlashList
          data={COMMUNITY_WALLPAPERS}
          keyExtractor={(item, index) => {
            return item.id + index.toString();
          }}
          renderItem={CommunityWallpaperItem}
          estimatedItemSize={screenHeight / 4}
          numColumns={2}
        />
      </View>
    </View>
  );
}

function CommunityWallpaperItem({ item, index }) {
  const wallpaperBlurHash = getRandomBlurHash();
  return (
    <TouchableOpacity
      style={{
        height: screenHeight / 4,
        borderRadius: 10,
        aspectRatio: "4/5",
        alignItems: "center",
        paddingVertical: 10,
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
