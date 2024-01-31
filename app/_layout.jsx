import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          // Name of the dynamic route.
          name="community"
          options={{
            // Ensure the tab always links to the same href.
            href: "/community",
            tabBarLabel: "Community Wallpapers",
          }}
        />
        <Tabs.Screen
          // Name of the dynamic route.
          name="index"
          options={{
            // Ensure the tab always links to the same href.
            href: "/",
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          // Name of the dynamic route.
          name="cards"
          options={{
            // Ensure the tab always links to the same href.
            href: "/cards",
            tabBarLabel: "Player Cards",
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
    </GestureHandlerRootView>
  );
}
