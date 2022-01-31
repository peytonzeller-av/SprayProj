import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProblemList from "./ProblemList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// TODO - Break out in to separate file
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="md-add-circle" size={32} />
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
    paddingTop: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
