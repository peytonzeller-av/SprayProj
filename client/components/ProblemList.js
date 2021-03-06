import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";

const ProblemList = ({ refreshList }) => {
  const navigation = useNavigation();
  const [myProblems, setMyProblems] = useState([]);

  const grades = myProblems.reduce((acc, curr) => {
    acc.add(curr.grade);
    return acc;
  }, new Set());

  const getProblemsForGrade = (grade) =>
    myProblems.filter((problem) => grade === problem.grade) || [];

  const getSentIcon = (problem) => {
    console.log(problem);
    return problem.sent ? (
      <List.Icon icon="check-box-outline" />
    ) : (
      <List.Icon icon="checkbox-blank-outline" />
    );
  };

  /* GET All problems */
  useEffect(() => {
    try {
      const fetchProblems = async () => {
        // get the data from the api
        const data = await fetch("http://10.0.0.217:5000/problems"); // TODO - ENV specific
        // convert data to json
        const myRetrievedProblems = await data.json();
        const sortedProblems = myRetrievedProblems.sort(
          (a, b) => a.grade - b.grade
        );
        setMyProblems(sortedProblems);
      };

      // call the function
      fetchProblems();
    } catch (e) {
      console.log("---------ERROR!---------", e);
    }
  }, [refreshList]);

  console.log(refreshList);

  return (
    <ScrollView style={styles.scrollView}>
      <List.AccordionGroup key={1}>
        {Array.from(grades).map((grade, i) => (
          <List.Accordion
            stye={styles.textGrade}
            title={`V${grade}`}
            id={`${grade}-${i}`}
            key={`${grade}-${i}`}
          >
            {getProblemsForGrade(grade).map((problem, idx) => (
              <List.Item
                key={`${grade}-${problem.key}-${idx}`}
                title={problem.name}
                onPress={() =>
                  navigation.navigate("ProblemView", {
                    problem,
                  })
                }
                right={(props) => getSentIcon(problem)}
              />
            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textGrade: {
    fontWeight: "bold",
  },
});

export default ProblemList;
