import { View, Text } from "react-native";

export default function Header() {
  return (
    <View
      style={{ flexDirection: "row" }}
      className="w-screen h-20 items-center justify-center pt-2 bg-main shadow shadow-black shadow-xl"
    >
      <Text className=" text-highlight-prime font-valo text-4xl">Val</Text>
      <Text className=" text-slate-400 font-valo text-4xl">papers</Text>
    </View>
  );
}
