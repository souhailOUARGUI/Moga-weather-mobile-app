import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginScreen from "../screens/loginScreen";
import signupScreen from "../screens/signupScreen";
import dashboardScreen from "../screens/dashboardScreen";
import HomeScreen from "../screens/hello";
import NewLoginScreen from "../screens/newLogin";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="hello"
      >
        <Stack.Screen name="signup" component={signupScreen} />
        <Stack.Screen name="hello" component={HomeScreen} />
        <Stack.Screen name="login" component={loginScreen} />
        {/* <Stack.Screen name="newlogin" component={NewLoginScreen} /> */}
        <Stack.Screen name="dashboard" component={dashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
