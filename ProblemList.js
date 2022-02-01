import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

const ProblemList = () => {
  const navigation = useNavigation();
  const [myProblems, setMyProblems] = useState([
    // TODO: Mock Data
    { key: "Problem1", grade: 1, createdOn: "01-30-2022" },
    { key: "Problem2", grade: 3, createdOn: "01-30-2022" },
    { key: "Problem3", grade: 5, createdOn: "01-30-2022" },
    { key: "Problem4", grade: 2, createdOn: "01-30-2022" },
    { key: "Problem5", grade: 8, createdOn: "01-30-2022" },
    { key: "Problem6", grade: 7, createdOn: "01-30-2022" },
    { key: "Problem7", grade: 6, createdOn: "01-30-2022" },
    { key: "Problem8", grade: 6, createdOn: "01-30-2022" },
    { key: "Problem9", grade: 4, createdOn: "01-30-2022" },
    { key: "Problem10", grade: 3, createdOn: "01-30-2022" },
  ]);

  const grades = myProblems.reduce((acc, curr) => {
    acc.add(curr.grade);
    return acc;
  }, new Set());

  const getProblemsForGrade = (grade) =>
    myProblems.filter((problem) => grade === problem.grade);

  // TODO - Wait for wifi issues to get resolved before testing w/ express
  // useEffect(() => {
  //   const problems = fetch("10.0.0.233:5000/problems") // TODO - Error is here, may be due me connected to ethernet instead of a wifi network
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log("new error", e));
  // }, []);

  return (
    <List.AccordionGroup>
      {Array.from(grades).map((grade) => (
        <List.Accordion title={`V${grade}`} id={grade}>
          {getProblemsForGrade(grade).map((problem) => (
            <List.Item
              title={problem.key}
              onPress={() =>
                navigation.navigate("ProblemView", {
                  name: problem.key,
                  grade: problem.grade,
                })
              }
            />
          ))}
        </List.Accordion>
      ))}
    </List.AccordionGroup>
  );
};

const styles = StyleSheet.create({
  textGrade: {
    marginRight: 6,
    fontWeight: "bold",
  },
});

export default ProblemList;
