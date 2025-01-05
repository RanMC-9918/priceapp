import { Platform, StyleSheet } from "react-native";

import {
  Text,
  View,
  FlatList,
  Button,
  TextInput
} from "react-native";

import { useState, useEffect } from "react";

import ProductList from "@/components/ProductList";

import AsyncStorage from "@react-native-async-storage/async-storage";

let storage:{getItem:Function, removeItem:Function, setItem:Function} = AsyncStorage;


import { product } from "@/constants/types";

import medicines from "@/constants/medicines";

storage.removeItem("medicine");

export default function TabOneScreen() {
  let [medicine, setMedicine] = useState<product[]>([]);
  let [newPrice, setNewPrice] = useState<number>(0);
  let [newMedicine, setNewMedicine] = useState<string>("");

  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadMedicine() {
      try {
        let res = await storage.getItem("medicine");
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

  function calculatePrice(name: string) {
    if (name) {
      setNewMedicine(name);
      setNewPrice(10);
    } else {
      setNewMedicine("");
      setNewPrice(0);
    }
  }

  //console.log(medicine);

  return (
    <View style={styles.full}>
      <View style={styles.total}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
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
        <View style={styles.inputNewCharge}>
          <TextInput
            style={[styles.total, styles.input]}
            placeholder="Product Name"
            value={newMedicine}
            onChangeText={(req) => calculatePrice(req)}
          />
          <Text style={styles.total}>${newPrice}</Text>
        </View>

        <View style={styles.inputNewCharge}>
          <Button title="Clear" onPress={() => calculatePrice("")} />
          <Button
            title="Enter"
            onPress={() => addMedicine(newMedicine, newPrice)}
          />
        </View>
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
    height: "70%",
  },
  newCharge: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "red",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  full: {
    height: "100%",
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputNewCharge: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
