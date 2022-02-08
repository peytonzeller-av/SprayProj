import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProblem from "./client/components/AddProblem";
import Home from "./client/components/Home";
import ProblemDetails from "./client/components/ProblemDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Peyton's Problems" }}
        />
        <Stack.Screen name="ProblemView" component={ProblemDetails} />
        <Stack.Screen name="AddProblemView" component={AddProblem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
