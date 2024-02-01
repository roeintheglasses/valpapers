import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { MotiView, MotiText } from "moti";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  blurView: {
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
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
  },
});
const highLightColor = "#ccb041";

export default function CustomTabBar({ state, descriptors, navigation }) {
  const renderTab = (route, index) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;

    if (["Not Found", "sitemap", "Favorites", "+not-found"].includes(label))
      return null;

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

  return (
    <View style={styles.container}>
      <BlurView
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        intensity={100}
        style={styles.blurView}
        className="flex-1 justify-between px-2 overflow-hidden"
      >
        {state.routes.map(renderTab)}
      </BlurView>
    </View>
  );
}

const TabIcon = ({ isFocused }) => (
  <MotiView
    animate={{
      backgroundColor: isFocused ? highLightColor : "transparent",
      paddingHorizontal: isFocused ? 15 : 0,
    }}
    transition={{
      type: "timing",
      duration: 200,
    }}
    style={styles.motiView}
  >
    <MCI name="cards-outline" size={20} color="#fff" />
  </MotiView>
);

const TabButton = ({ isFocused, label, onPress, onLongPress }) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityState={isFocused ? { selected: true } : {}}
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.tabButton}
  >
    <TabIcon isFocused={isFocused} />
    <MotiText
      animate={{
        color: isFocused ? highLightColor : "#fff",
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
