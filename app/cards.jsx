import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { PLAYER_CARDS } from "../data/assetList.json";
import { Image } from "expo-image";
import getRandomBlurHash from "@lib/getRandomBlurHash";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

import usePlayerCards from "@hooks/usePlayerCards";

export default function CommunityValpapers() {
  const { data, isLoading, isError, isSuccess } = usePlayerCards();
  const [playerCards, setPlayerCards] = useState([]);
  const [isDataSet, setIsDataSet] = useState(false);

  useEffect(() => {
    if (isSuccess && Array.isArray(data) && !isDataSet) {
      setPlayerCards(data);
      setIsDataSet(true);
    }
    return () => setPlayerCards([]);
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <View className="flex-1 items-start justify-start bg-main px-2">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-start justify-start bg-main px-2">
      <View
        className="px-2"
        style={{ height: screenHeight - 155, width: screenWidth }}
      >
        <MasonryFlashList
          data={playerCards}
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
        source={{ uri: item.largeArt }}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 10,
        }}
        placeholder={wallpaperBlurHash}
        recyclingKey={`${item.uuid + index.toString()}-playerCard`}
      />
    </TouchableOpacity>
  );
}
