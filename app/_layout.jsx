import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs, Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { StatusBar } from "expo-status-bar";

import Header from "@components/Header";
import MyTabBar from "@components/CustomTabBar";

import { QueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { fetchWallpapers } from "@hooks/usePlayerCards";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 }, cacheTime: 1000 * 60 * 60 * 24 },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// Import global styles
import "../global.css";

// Preloading fonts and preventing auto-hide of the splash screen
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const pathName = usePathname();
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    Valo: require("../assets/fonts/ValFont.ttf"),
  });
  const [dataPrefetched, setDataPrefetched] = useState(false);

  useEffect(() => {
    async function prefetchPlayerCards() {
      if (dataPrefetched) return;
      await queryClient.prefetchQuery({
        queryKey: ["playerCards"],
        queryFn: fetchWallpapers,
      });
      setDataPrefetched(true);
    }
    prefetchPlayerCards();
  });

  useEffect(() => {
    async function handleSplashScreen() {
      if (fontsLoaded && dataPrefetched) {
        await SplashScreen.hideAsync();
      }
    }
    handleSplashScreen();
  }, [fontsLoaded, dataPrefetched]);

  if (!fontsLoaded) {
    return null; // Consider showing a loading indicator or a splash screen here
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#1b2228" }}>
        <StatusBar backgroundColor="transparent" />
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          {/* <Stack initialRouteName="index" /> */}
          <Tabs
            initialRouteName="index"
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <MyTabBar {...props} path={pathName} />}
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
            <Tabs.Screen
              name="display"
              options={{
                href: null,
                tabBarLabel: "Display",
              }}
            />
          </Tabs>
        </SafeAreaView>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}
