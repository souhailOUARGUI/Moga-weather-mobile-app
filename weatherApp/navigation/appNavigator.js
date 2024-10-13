import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginScreen from "../screens/loginScreen";
import signupScreen from "../screens/signupScreen";
import dashboardScreen from "../screens/dashboardScreen";
import HomeScreen from "../screens/hello";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{ headerShown: false }}
//         initialRouteName="hello"
//       >
//         <Stack.Screen name="signup" component={signupScreen} />
//         <Stack.Screen name="hello" component={HomeScreen} />
//         <Stack.Screen name="login" component={loginScreen} />
//         <Stack.Screen name="dashboard" component={dashboardScreen} />
//         {/* <Stack.Screen name="tab" component={TabScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="login"
      >
        <Stack.Screen name="signup" component={signupScreen} />
        {/* <Stack.Screen name="hello" component={HomeScreen} /> */}
        <Stack.Screen name="login" component={loginScreen} />
        <Stack.Screen name="home" component={TabScreen} />
        {/* <Stack.Screen name="tab" component={TabScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabScreen({ navigation, route }) {
  const { user } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "dashboard") {
            iconName = focused ? "home" : "home-outline"; // Example: Ionicons
          } else if (route.name === "charts") {
            iconName = focused ? "bar-chart" : "bar-chart-outline"; // Example: Ionicons
          }

          // Return the appropriate icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "gray", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={dashboardScreen}
        initialParams={{ user }}
      />
      <Tab.Screen name="charts" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function TestHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
export default AppNavigator;
