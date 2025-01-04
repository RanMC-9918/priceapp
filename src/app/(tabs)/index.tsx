import { StyleSheet } from "react-native";

import { Text, View, FlatList, Button, TextInput } from "react-native";

import { useState, useEffect } from "react";

import { readRemoteFile } from "react-native-csv";

let medicines = { hi: "hi" };

// import Colors from "@/constants/Colors.ts";

import ProductList from "@/components/ProductList";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { product } from "@/constants/types";

import medicines from "@/constants/medicines";

AsyncStorage.removeItem("medicine");

export default function TabOneScreen() {
  let [medicine, setMedicine] = useState<product[]>([]);
  let [newPrice, setNewPrice] = useState<number>(0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadMedicine() {
      try {
        let res = await AsyncStorage.getItem("medicine");
        //console.log(res);
        if (res) {
          let ans = JSON.parse(res);
          setMedicine(ans);
          const totalPrice = ans.reduce(
            (sum: number, item: product) => sum + item.price,
            0
          );
          setTotal(totalPrice);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadMedicine();
  }, []);

  async function addMedicine(name: string, price: number) {
    try {
      let res = await AsyncStorage.getItem("medicine");
      if (res) {
        let ans: product[] = JSON.parse(res);
        ans.push({ name, price });
        //console.log(ans);
        setMedicine(ans);
        setTotal((prevTotal) => prevTotal + price);
        AsyncStorage.setItem("medicine", JSON.stringify(ans));
      } else {
        let ans: product[] = [{ name, price }];
        setMedicine(ans);
        setTotal(price);
        AsyncStorage.setItem("medicine", JSON.stringify(ans));
      }
    } catch (e) {
      console.error(e);
    }
  }

  function calculatePrice(req: string) {}

  //console.log(medicine);

  return (
    <View style={styles.full}>
      <View style={styles.total}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
      <Button title="Hello" onPress={() => addMedicine("Mestg", 23)} />
      <View style={styles.header}>
        <Text style={styles.title}>Your Charges</Text>
        <FlatList
          style={styles.charges}
          data={medicine}
          renderItem={({ item }) => (
            <ProductList name={item.name} price={item.price} />
          )}
        />
      </View>
      <View style={styles.newCharge}>
        <TextInput
          style={styles.total}
          placeholder="Product Name"
          onChangeText={(req) => calculatePrice(req)}
        />
        <Text style={styles.total}>${newPrice}</Text>
      </View>
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
  total: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "red",
  },
  charges: {
    height: "72%",
  },
  newCharge: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "red",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  full: {
    height: "100%",
  },
});
