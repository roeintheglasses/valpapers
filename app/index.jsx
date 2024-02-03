import React from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { FlashList } from "@shopify/flash-list";
import { MAIN_WALLPAPERS, COMMUNITY_WALLPAPERS } from "@data/assetList.json";
import { Image } from "expo-image";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function getRandomWallpapers(list, number) {
  return list.sort(() => 0.5 - Math.random()).slice(0, number);
}

function Home() {
  return (
    <View className="flex-1 items-center justify-start bg-main py-5 px-5">
      <WallpaperCarousel />
      <CommunityWallpaperGrid />
      <PlayerCardWallpaperGrid />
    </View>
  );
}

function WallpaperCarousel() {
  return (
    <Carousel
      loop
      width={screenWidth}
      height={screenHeight / 4}
      autoPlay
      data={getRandomWallpapers(MAIN_WALLPAPERS, 7)}
      scrollAnimationDuration={1000}
      pagingEnabled
      snapEnabled
      autoPlayInterval={2500}
      mode="parallax"
      modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 50 }}
      renderItem={WallpaperCard}
    />
  );
}

function CommunityWallpaperGrid() {
  return (
    <View className="flex-1 items-start justify-start bg-main">
      <Text
        style={{ paddingHorizontal: 12, paddingTop: 20 }}
        className="font-poppinsBold text-2xl text-slate-200"
      >
        Community Valpapers
      </Text>
      <FlashList
        data={getRandomWallpapers(COMMUNITY_WALLPAPERS, 20)}
        keyExtractor={function keyExtractor(item, index) {
          return `${index}-${item.id}-FlashList-Community`;
        }}
        renderItem={WallpaperItem}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={20}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    </View>
  );
}

function PlayerCardWallpaperGrid() {
  return (
    <View className="flex-1 items-start justify-start bg-main">
      <Text
        style={{ paddingHorizontal: 12, paddingTop: 20 }}
        className="font-poppinsBold text-2xl text-slate-200"
      >
        Community Valpapers
      </Text>
      <FlashList
        data={getRandomWallpapers(COMMUNITY_WALLPAPERS, 20)}
        keyExtractor={function keyExtractor(item, index) {
          return `${index}-${item.id}-FlashList-PlayerCards`;
        }}
        renderItem={WallpaperItem}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={20}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    </View>
  );
}

function WallpaperCard({ item, index }) {
  return (
    <TouchableOpacity
      style={{
        height: "100%",
        width: screenWidth,
        paddingHorizontal: 10,
      }}
    >
      <ImageBackground
        source={{ uri: item.uri }}
        className="flex-1 justify-center items-center bg-gray-900 rounded-2xl"
        imageStyle={{ borderRadius: 10, opacity: 0.55 }}
      >
        <Text className="text-white text-center font-poppinsBold text-4xl">
          {index === 0 ? "Val of the day" : getIntroText()}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function WallpaperItem({ item, index }) {
  return (
    <TouchableOpacity
      style={{
        height: screenHeight / 5,
        width: screenWidth / 1.3,
        paddingRight: 20,
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          height: "100%",
          width: "100%",
          marginVertical: 10,
          borderRadius: 10,
          padding: 10,
        }}
        placeholder={blurhash}
      />
    </TouchableOpacity>
  );
}

function getIntroText() {
  const intros = ["Top Pick", "Newest Entry", "Most Popular", "Trending Val"];
  return intros[Math.floor(Math.random() * intros.length)];
}

export default Home;
