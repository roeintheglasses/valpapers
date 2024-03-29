import { View, TouchableOpacity, StyleSheet } from "react-native";
// import { BlurView } from "expo-blur";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { MotiView, MotiText } from "moti";
import { usePathname } from "expo-router";

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: 0, left: 0, right: 0, height: 70 },
  blurView: {
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  motiView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 5,
  },
  labelText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 12,
  },
});
const highLightColor = "#ff4655";

export default function CustomTabBar({ state, descriptors, navigation, path }) {
  const renderTab = (route, index) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;

    if (!shouldRenderCurrentTab(label)) return null;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    return (
      <TabButton
        key={route.key}
        isFocused={isFocused}
        label={label}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    );
  };

  if (!shouldTabBar(path)) return null;
  return (
    <View style={styles.container}>
      <MotiView
        style={styles.blurView}
        className="justify-between items-center px-4 bg-main"
      >
        {state.routes.map(renderTab)}
      </MotiView>
    </View>
  );
}

function TabIcon({ isFocused, label }) {
  return (
    <MotiView
      animate={{
        backgroundColor: isFocused ? highLightColor : "transparent",
        paddingHorizontal: isFocused ? 15 : 0,
        scale: isFocused ? 1.1 : 1,
      }}
      transition={{
        type: "timing",
        duration: 200,
      }}
      style={styles.motiView}
    >
      {getTabIconFromLabel(label)}
    </MotiView>
  );
}
function TabButton({ isFocused, label, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
    >
      <TabIcon isFocused={isFocused} label={label} />
      <MotiText
        animate={{
          color: isFocused ? highLightColor : "#fff",
          scale: isFocused ? 1.1 : 1,
          paddingTop: isFocused ? 2 : 0,
        }}
        transition={{
          type: "timing",
          duration: 200,
        }}
        style={styles.labelText}
      >
        {label}
      </MotiText>
    </TouchableOpacity>
  );
}

// Utility Functions
function getTabIconFromLabel(label) {
  if (label === "Home") return <MCI name="home" size={22} color="#fff" />;
  else if (label === "Cards")
    return <MCI name="cards-outline" size={22} color="#fff" />;
  return <MCI name="google-circles-communities" size={22} color="#fff" />;
}
function shouldRenderCurrentTab(label) {
  if (
    ["Not Found", "sitemap", "Favorites", "+not-found", "Display"].includes(
      label
    )
  )
    return false;
  return true;
}

function shouldTabBar(currentPath) {
  if (["/display"].includes(currentPath)) return false;
  return true;
}
