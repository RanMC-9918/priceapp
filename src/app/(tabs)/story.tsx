import {
  FlatList,
  StyleSheet,
  ScrollView,
  View as Flat,
  TextInput,
  useColorScheme,
} from "react-native";

import { Text, View } from "@/components/Themed";

import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { EditableStat } from "@/components/EditableStat";
import { statSection, statistic } from "@/constants/types";

let storage: { getItem: Function; removeItem: Function; setItem: Function } =
  AsyncStorage;

export default function TabTwoScreen() {
  let [patientInfo, setPatientInfo] = useState<statSection[]>([]);

  const color = useColorScheme();

  useEffect(() => {
    async function loadPatientInfo() {
      try {
        let res = await storage.getItem("patientInfo");
        if (res) {
          let ans: statSection[] = JSON.parse(res);
          setPatientInfo(ans);
        } else {
          setPatientInfo([
            {
              title: "No info found",
              data: [{ stat: "hellio", entryId: 0 }],
              statisticId: 0,
            },
          ]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadPatientInfo();
  }, []);

  async function savePatientInfo() {
    try {
      await storage.setItem("patientInfo", JSON.stringify(patientInfo));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <FlatList
        style={styles.list}
        data={patientInfo}
        keyExtractor={(item) => item.statisticId.toString()}
        renderItem={({ item }) => {
          const statisticId = item.statisticId;
          return (
            <Flat>
              <View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <FlatList
                data={item.data}
                keyExtractor={(item) => {
                  return { statisticId } + "-" + item.entryId.toString();
                }}
                renderItem={({ item }) => (
                  <Flat>
                    <TextInput
                      style={[
                        styles.editablestat,
                        { color: color === "dark" ? "white" : "black" },
                      ]}
                      onChangeText={(text) => {
                        const ans = patientInfo;
                        console.log(statisticId);
                        ans[statisticId].data[item.entryId].stat = text;
                        setPatientInfo(ans);
                      }}
                      onEndEditing={savePatientInfo}
                      onSubmitEditing={savePatientInfo}
                    >
                      {item.stat}
                    </TextInput>
                  </Flat>
                )}
              />
            </Flat>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 30,
    paddingVertical: 25,
    textAlign: "center",
  },
  list: {
    padding: 0,
  },
  editablestat: {
    marginVertical: 10,
    fontSize: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#99999933",
    borderLeftWidth: 5,
    borderColor: "#999999",
    borderRadius: 0,
  },
});
