import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import Colors from "@/constants/Colors";

import { product } from "@/constants/types";

function ProductList(prod: product) {
  //console.log(prod);
  return (
    <View style={styles.li}>
      <Text style={styles.item}>{prod.name}</Text>
      <Text style={styles.price}>{"$" + prod.price}</Text>
    </View>
  );
}

export default ProductList;

const styles = StyleSheet.create({
  li: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.secondary,
  },
  item: {
    fontSize: 20,
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    lineHeight: 24,
  },
});
