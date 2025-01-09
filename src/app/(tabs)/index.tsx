import { Platform, StyleSheet, useColorScheme } from "react-native";

import {
  View as Flat,
  FlatList,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import { Text, View, TextInput } from "@/components/Themed";

import { useState, useEffect } from "react";

import ProductList from "@/components/ProductList";

import AsyncStorage from "@react-native-async-storage/async-storage";

let storage: { getItem: Function; removeItem: Function; setItem: Function } =
  AsyncStorage;

import { product } from "@/constants/types";

import medicines from "@/constants/medicines";

import { EventRegister } from "react-native-event-listeners";

//storage.removeItem("medicine");

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

  useEffect(() => {
    const ans = medicine.reduce(
      (total: number, item: product) => (total += item.price),
      0
    );
    setTotal(ans);
  }, [medicine]);

  useEffect(() => {
    EventRegister.addEventListener("removeMedicine", (prod: product) => {
      const ans = medicine.filter((med) => med.id !== prod.id);
      setMedicine(ans);
      storage.setItem("medicine", JSON.stringify(ans));
    });
  });

  async function addMedicine(name: string, price: number) {
    try {
      let res = await AsyncStorage.getItem("medicine");
      if (res) {
        let ans: product[] = JSON.parse(res);
        let ansLength = ans.length;
        ans.push({ name, price, id: ans[ansLength - 1].id + 1 });
        //console.log(ans);
        setMedicine(ans);
        setTotal((prevTotal) => prevTotal + price);
        AsyncStorage.setItem("medicine", JSON.stringify(ans));
      } else {
        let ans: product[] = [{ name, price, id: 1 }];
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
      if (newPrice == 0) {
        const ans = medicines.find(
          (med) => med.name.toLowerCase() === name.toLowerCase()
        )?.price;
        ans && setNewPrice(ans);
      }
    } else {
      setNewMedicine("");
      setNewPrice(0);
    }
  }

  //console.log(medicine);

  const colors = useColorScheme();

  return (
    <Flat style={{ backgroundColor: "#00000000", flex: 1 }}>
      <View style={styles.total}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={90}
        style={styles.keyboardAList}
      >
        <Flat
          style={{
            backgroundColor: colors === "light" ? "white" : "black",
            flex: 1,
          }}
        >
          <Text style={styles.title}>Your Charges</Text>
          <FlatList
            data={medicine}
            renderItem={({ item }) => <ProductList prod={item} />}
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 1 }}
          />
        </Flat>

        <View style={styles.newCharge}>
          <View style={styles.inputNewCharge}>
            <TextInput
              style={[styles.total, styles.input]}
              placeholder="Product Name"
              value={newMedicine}
              onChangeText={(req) => calculatePrice(req)}
            />
            <TextInput
              style={[styles.total, styles.price]}
              placeholder="$0"
              value={`$${newPrice}`}
              keyboardType="number-pad"
              onChangeText={(req) => {
                const p = req.replace(/[^0-9]/g, "");
                setNewPrice(Number(p));
              }}
            />
          </View>

          <View style={styles.inputNewCharge}>
            <Button title="Clear" onPress={() => calculatePrice("")} />
            <Button
              title="Enter"
              onPress={() => addMedicine(newMedicine, newPrice)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Flat>
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
  },
  newCharge: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  price: {},
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
  keyboardAList: {
    flex: 1,
    flexDirection: "column",
  },
});
