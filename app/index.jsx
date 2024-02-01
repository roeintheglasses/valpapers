import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, ImageBackground } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { MAIN_WALLPAPERS, VAL_LOGO } from "@data/assetList.json";

const Dev_Height = Dimensions.get("screen").height;
const Dev_Width = Dimensions.get("screen").width;
const Item_Width = Dev_Width - 0.6 * Dev_Width;

import Header from "@components/Header";

export default function Home() {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-slate-700 py-10 px-5">
        <Text className="text-white">Top Picks</Text>
        <FlashList
          data={MAIN_WALLPAPERS}
          keyExtractor={(item, index) => {
            return item.id + index.toString();
          }}
          renderItem={WallpaperCards}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={Separator}
          alwaysBounceHorizontal={true}
          bounces={true}
          estimatedItemSize={35}
        />
      </View>
    </>
  );
}

function setupTopWallpapers() {
  let topPapers = MAIN_WALLPAPERS.sort(() => 0.5 - Math.random()).slice(0, 10);
  return topPapers;
}

function Separator() {
  return (
    <View
      style={{
        width: 15,
      }}
    />
  );
}

function WallpaperCards({ item, index }) {
  return (
    <ImageBackground
      source={{ uri: item.uri }}
      className="w-screen h-full"
      imageStyle={{
        borderRadius: 15,
        top: 0,
      }}
    />
  );
}

// HomeScreen = ({ navigation }) => {
//   const [topWallpapers, setTopWallpapers] = useState([]);
//   const [playerCards, setPlayerCards] = useState([]);

//   //TODO: Handle status, loadind & error
//   const { data, isLoading, isError, isSuccess } = useWallpapers();

//   const x = useRef(new Animated.Value(-100)).current;

//   const slide = () => {
//     Animated.spring(x, {
//       toValue: 0,
//       useNativeDriver: true,
//       speed: 0.2,
//     }).start();
//   };

//   useEffect(() => {
//     setTopWallpapers(setupTopWallpapers);
//     slide();
//   }, []);

//   useEffect(() => {
//     if (isSuccess && Array.isArray(data)) {
//       let selectedCards = data.sort(() => 0.5 - Math.random()).slice(0, 8);
//       setPlayerCards(selectedCards);
//     } else {
//       setPlayerCards([]);
//     }
//   }, [isSuccess, data]);

//   return (

//   );
// };
