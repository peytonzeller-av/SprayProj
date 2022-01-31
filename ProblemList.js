import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProblemList = () => {
  const navigation = useNavigation();
  // Mock Data
  const data = [
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
  ];

  return (
    <FlatList
      data={data}
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
