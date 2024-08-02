import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginScreen from "../screens/loginScreen";
import signupScreen from "../screens/signupScreen";
import dashboardScreen from "../screens/dashboardScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="signup" component={signupScreen} />
        <Stack.Screen name="login" component={loginScreen} />
        <Stack.Screen name="dashboard" component={dashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
