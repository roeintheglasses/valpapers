import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import Header from "@components/Header";
import MyTabBar from "@components/CustomTabBar";

// Import global styles
import "../global.css";

// Preloading fonts and preventing auto-hide of the splash screen
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    Valo: require("../assets/fonts/ValFont.ttf"),
  });

  useEffect(() => {
    async function handleSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    handleSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Consider showing a loading indicator or a splash screen here
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <Tabs
          initialRouteName="index"
          screenOptions={{ headerShown: false }}
          tabBar={MyTabBar}
        >
          <Tabs.Screen
            name="community"
            options={{
              href: "/community",
              tabBarLabel: "Community",
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              href: "/",
              tabBarLabel: "Home",
            }}
          />
          <Tabs.Screen
            name="cards"
            options={{
              href: "/cards",
              tabBarLabel: "Cards",
            }}
          />
          <Tabs.Screen
            name="favorites"
            options={{
              href: null,
              tabBarLabel: "Favorites",
            }}
          />
        </Tabs>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
