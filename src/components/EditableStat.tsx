import { Pressable } from "react-native";
import { View, Text, FontAwesome } from "./Themed";

import { StyleSheet } from "react-native";

import { statistic } from "../constants/types";

interface PropType {
  props: statistic;
}

export function EditableStat({ props }: PropType) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.stat}</Text>
      <Pressable style={styles.statistic}>
        <Text style={styles.text}>Edit</Text>
        <FontAwesome size={20} name="pencil" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 40,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#99999912",
  },
  text: {
    fontSize: 20,
  },
  statistic: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#68B6D9",
    borderRadius: 5,
    alignItems: "center",
    gap: 8,
  },
});
