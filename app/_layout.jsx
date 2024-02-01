import { Tabs, Slot } from "expo-router";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import Header from "@components/Header";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import MyTabBar from "@components/CustomTabBar";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    Valo: require("../assets/fonts/ValFont.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <Tabs
          initialRouteName="index"
          screenOptions={{ headerShown: false }}
          tabBar={MyTabBar}
        >
          <Tabs.Screen
            // Name of the dynamic route.
            name="community"
            options={{
              // Ensure the tab always links to the same href.
              href: "/community",
              tabBarLabel: "Community",
              tabBarIcon: () => (
                <MCI
                  name="google-circles-communities"
                  size={24}
                  color={"#fff"}
                />
              ),
            }}
          />
          <Tabs.Screen
            // Name of the dynamic route.
            name="index"
            options={{
              // Ensure the tab always links to the same href.
              href: "/",
              tabBarLabel: "Home",
              tabBarIcon: () => (
                <MCI name="cards-outline" size={24} color={"#fff"} />
              ),
            }}
          />
          <Tabs.Screen
            // Name of the dynamic route.
            name="cards"
            options={{
              // Ensure the tab always links to the same href.
              href: "/cards",
              tabBarLabel: "Cards",
              tabBarIcon: () => (
                <MCI name="cards-outline" size={24} color={"#fff"} />
              ),
            }}
          />
          <Tabs.Screen
            // Name of the dynamic route.
            name="favorites"
            options={{
              // Ensure the tab always links to the same href.
              href: null,
              tabBarLabel: "Favorites",
            }}
          />
        </Tabs>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
