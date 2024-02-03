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
import {
  MAIN_WALLPAPERS,
  COMMUNITY_WALLPAPERS,
  PLAYER_CARDS,
} from "@data/assetList.json";
import { Image } from "expo-image";
import { ScrollView } from "react-native-gesture-handler";
import getRandomBlurHash from "@lib/getRandomBlurHash";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

function getRandomWallpapers(list, number) {
  return list.sort(() => 0.5 - Math.random()).slice(0, number);
}

function Home() {
  return (
    <View className="flex-1 items-center justify-start bg-main px-2">
      <ScrollView>
        <View style={{ height: screenHeight / 4 }}>
          <WallpaperCarousel />
        </View>
        <View style={{ height: screenHeight / 2.8 }}>
          <PlayerCardWallpaperGrid />
        </View>
        <View style={{ height: screenHeight / 2.8 }}>
          <CommunityWallpaperGrid />
        </View>
      </ScrollView>
    </View>
  );
}

// Wallpaper Carousel Components
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

function WallpaperCard({ item, index }) {
  return (
    <TouchableOpacity
      style={{
        width: screenWidth,
        paddingHorizontal: 5,
        aspectRatio: "16/9",
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

// Community Wallpapers Components
function CommunityWallpaperGrid() {
  return (
    <>
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
        nestedScrollEnabled={true}
        renderItem={CommunityWallpaperItem}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={20}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    </>
  );
}
function CommunityWallpaperItem({ item, index }) {
  const communityWallpaperBlurHash = getRandomBlurHash();

  return (
    <TouchableOpacity
      style={{
        width: screenWidth / 1.5,
        paddingRight: 20,
        aspectRatio: "16/9",
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
        placeholder={communityWallpaperBlurHash}
      />
    </TouchableOpacity>
  );
}

// Player Cards Wallpapers Components
function PlayerCardWallpaperGrid() {
  return (
    <>
      <Text
        style={{ paddingHorizontal: 12, paddingTop: 20 }}
        className="font-poppinsBold text-2xl text-slate-200"
      >
        Player Cards
      </Text>
      <FlashList
        data={getRandomWallpapers(PLAYER_CARDS, 20)}
        keyExtractor={function keyExtractor(item, index) {
          return `${index}-${item.id}-FlashList-PlayerCards`;
        }}
        nestedScrollEnabled={true}
        renderItem={PlayerCardItem}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={20}
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    </>
  );
}

function PlayerCardItem({ item, index }) {
  const playerCardBlurHash = getRandomBlurHash();
  return (
    <TouchableOpacity
      style={{
        width: screenWidth / 3,
        paddingRight: 20,
        aspectRatio: "9/16",
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
        placeholder={playerCardBlurHash}
      />
    </TouchableOpacity>
  );
}

// Utils
function getIntroText() {
  const intros = ["Top Pick", "Newest Entry", "Most Popular", "Trending Val"];
  return intros[Math.floor(Math.random() * intros.length)];
}

export default Home;
