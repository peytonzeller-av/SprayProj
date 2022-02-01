import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProblemList from "./ProblemList";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProblem from "./client/components/AddProblem";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Peyton's Problems" }}
        />
        <Stack.Screen name="ProblemView" component={ProblemDetails} />
        <Stack.Screen name="AddProblemView" component={AddProblem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// TODO - Break out in to separate file
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={{
            paddingRight: 10,
          }}
          name="md-pencil-outline"
          size={24}
          onPress={() => navigation.navigate("AddProblemView")}
        />
      </View>
      <ProblemList />
    </View>
  );
};

// TODO - Break out in to separate file
const ProblemDetails = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.name}</Text>
      <Text>V{route.params.grade}</Text>
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
