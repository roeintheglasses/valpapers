import { View, Text } from "react-native";

export default function Header() {
  return (
    <View
      style={{ flexDirection: "row" }}
      className="w-screen h-16 items-center justify-center pt-4 bg-main"
    >
      <Text className=" text-highlight-prime font-valo text-4xl">Val</Text>
      <Text className=" text-slate-400 font-valo text-3xl">papers</Text>
    </View>
  );
}
