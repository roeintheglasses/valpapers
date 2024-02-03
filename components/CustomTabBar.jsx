import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import MCI from "@expo/vector-icons/MaterialCommunityIcons";
import { MotiView, MotiText } from "moti";

const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
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
        className="flex-1 justify-between items-center px-4"
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
      scale: isFocused ? 1.1 : 1,
    }}
    transition={{
      type: "timing",
      duration: 200,
    }}
    style={styles.motiView}
  >
    <MCI name="cards-outline" size={22} color="#fff" />
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
