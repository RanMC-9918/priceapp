import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { FlatList } from "react-native";
import ProductList from "@/components/ProductList";

let patientStats = [
  {
    title: "Blood Pressure",
    content: 15,
  },
  {
    title: "Blood Pressure",
    content: 15,
  },
  {
    title: "Blood Pressure",
    content: 15,
  },
  {
    title: "Blood Pressure",
    content: 15,
  },
  {
    title: "Blood Pressure",
    content: 15,
  },
  {
    title: "Blood Pressure",
    content: 15,
  },
];

let patientPastConditions = ["title", "content", "sdfsdasadf"]

export default function TabOneScreen() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Past Conditions</Text>
      </View>
      {patientPastConditions.length < 0 ? (
        <Text style={styles.pad}>Looks Empty...</Text>
      ) : (
        <FlatList
          data={patientPastConditions}
          renderItem={({ item }) => <Text style={styles.pad}>{item}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {},
  title: {
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 30,
    paddingVertical: 20,
    textAlign: "center",
  },
  pad: {
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});
