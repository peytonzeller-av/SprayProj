import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ProblemList from "./ProblemList";

const Home = ({ route }) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setParams({ refreshList: false });
  }, [route.params?.refreshList]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={{
            paddingRight: 10,
          }}
          name="md-add-circle-outline"
          size={32}
          onPress={() => navigation.navigate("AddProblemView")}
        />
      </View>
      <ProblemList refreshList={route.params?.refreshList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
});

export default Home;
