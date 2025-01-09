import {
  StyleSheet,
  Pressable,
  Animated,
  useAnimatedValue,
} from "react-native";

import { useState } from "react";

import { Text, View } from "@/components/Themed";

import { product } from "@/constants/types";
import { EventRegister } from "react-native-event-listeners";

interface propType {
  prod: product;
}

function ProductList({ prod }: propType) {
  const left = useAnimatedValue(0);
  const [open, setOpen] = useState(false);

  let openAnim: Animated.CompositeAnimation;
  let closeAnim: Animated.CompositeAnimation;
  openAnim = Animated.timing(left, {
    toValue: -100,
    duration: 200,
    useNativeDriver: true,
  });
  closeAnim = Animated.timing(left, {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
  });
  //console.log("anime ready");

  //console.log(prod);
  return (
    <Animated.View style={{ transform: [{ translateX: left }] }}>
      <Pressable
        style={styles.swipe}
        onPress={() => {
          if (open) {
            setOpen(false);
            closeAnim.start();
          } else {
            setOpen(true);
            openAnim.start();
          }
        }}
      >
        <View style={styles.li}>
          <Text style={styles.item}>{prod.name}</Text>
          <Text style={styles.price}>{"$" + prod.price}</Text>
        </View>

        <Pressable
          style={[styles.button, styles.remove]}
          onPress={() => {
            EventRegister.emit("removeMedicine", prod);
          }}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
      </Pressable>
    </Animated.View>
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
    backgroundColor: "#83838355",
  },
  item: {
    fontSize: 20,
    lineHeight: 24,
  },
  price: {
    fontSize: 20,
    lineHeight: 24,
  },
  swipe: {
    flexDirection: "row",
  },
  button: {
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    fontSize: 18,
  },
  edit: {
    backgroundColor: "#FF9900",
  },
  remove: {
    backgroundColor: "#FF0000",
  },
});
