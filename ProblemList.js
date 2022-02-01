import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProblemList = () => {
  const [myProblems, setMyProblems] = useState([]);

  useEffect(() => {
    const problems = fetch("10.0.0.233:5000/problems") // TODO - Error is here, may be due me connected to ethernet instead of a wifi network
      .then((res) => console.log(res))
      .catch((e) => console.log("new error", e));
  }, []);

  return (
    <FlatList
      data={[]}
      renderItem={({ item }) => (
        <Text
          onPress={() =>
            navigation.navigate("ProblemView", {
              name: item.key,
              grade: item.grade,
            })
          }
          style={{
            padding: 10,
            fontSize: 18,
            height: 44,
          }}
        >
          {item.key}
        </Text>
      )}
    />
  );
};

export default ProblemList;
