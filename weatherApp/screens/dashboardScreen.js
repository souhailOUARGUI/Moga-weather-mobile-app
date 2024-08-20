// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { fetchMetars, fetchSynops } from "../api/api";
// // import axios from "axios";
// import io from "socket.io-client";

// const API_URL = "http://192.168.178.205:3000";
// const DashboardScreen = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [selectedType, setSelectedType] = useState("Metar");
//   const { user } = route.params;
//   const socket = io(API_URL);

//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         if (selectedType == "Metar") {
//           const data = await fetchMetars(setMessages);
//         }
//         if (selectedType == "Synop") {
//           const data = await fetchSynops(setMessages);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     loadMessages();
//     socket.on("mobile", (data) => {
//       console.log(data);
//       Alert.alert("New Weather Message", data.message);
//       loadMessages();
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedType]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome, {user.userData.name}</Text>
//       <Text style={styles.subtitle}>Weather Messages</Text>

//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Select Type:</Text>
//         <Picker
//           selectedValue={selectedType}
//           style={styles.picker}
//           onValueChange={(itemValue) => {
//             setSelectedType(itemValue);
//             useEffect;
//           }}
//         >
//           <Picker.Item label="Metar" value="Metar" />
//           <Picker.Item label="Synop" value="Synop" />
//         </Picker>
//       </View>

//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.messageContainer}>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Message:</Text> {item.message}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Type:</Text> {item.type}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Station:</Text> {item.station}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Time:</Text>{" "}
//               {new Date(item.timestamp).toLocaleString()}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Wind Direction:</Text>{" "}
//               {item.wind_direction}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Wind Speed:</Text> {item.wind_speed}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Wind Unit:</Text> {item.wind_unit}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Visibility:</Text> {item.visibility}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Weather:</Text> {item.weather}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Temperature:</Text> {item.temperature}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Dew Point:</Text> {item.dew_point}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Pressure:</Text> {item.pressure}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Remarks:</Text> {item.remarks}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 30,
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   pickerContainer: {
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   pickerLabel: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   picker: {
//     width: 200,
//   },
//   messageContainer: {
//     padding: 16,
//     marginBottom: 8,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     borderColor: "#dcdcdc",
//     borderWidth: 1,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   bold: {
//     fontWeight: "bold",
//   },
// });
// export default DashboardScreen;

// ******************************************************************
// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { fetchMetars, fetchSynops } from "../api/api";
// import { Card } from "react-native-elements";
// import { LinearGradient } from "expo-linear-gradient";
// import io from "socket.io-client";

// const API_URL = "http://192.168.178.205:3000";

// export const colors = {
//   white: "#FFFFFF",
//   primary: "#45484A",
//   secondary: "#AEB5BB",
//   gray: "#D9D9D9",
//   translucentWhite: "rgba(255, 255, 255, 0.5)",
//   translucentGray: "rgba(217, 217, 217, 0.3)",
// };

// const DashboardScreen = ({ route }) => {
//   const [messages, setMessages] = useState([]);
//   const [selectedType, setSelectedType] = useState("Metar");
//   const { user } = route.params;
//   const socket = io(API_URL);

//   useEffect(() => {
//     const loadMessages = async () => {
//       try {
//         if (selectedType === "Metar") {
//           await fetchMetars(setMessages);
//         }
//         if (selectedType === "Synop") {
//           await fetchSynops(setMessages);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     loadMessages();

//     socket.on("mobile", (data) => {
//       console.log(data);
//       Alert.alert("New Weather Message", data.message);
//       loadMessages();
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedType]);

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={[colors.translucentWhite, colors.translucentGray]}
//         style={styles.header}
//       >
//         <Text style={styles.title}>Welcome, {user.userData.name}</Text>
//         <Text style={styles.subtitle}>Weather Messages</Text>
//       </LinearGradient>

//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Select Type:</Text>
//         <Picker
//           selectedValue={selectedType}
//           style={styles.picker}
//           onValueChange={(itemValue) => {
//             setSelectedType(itemValue);
//           }}
//         >
//           <Picker.Item label="Metar" value="Metar" />
//           <Picker.Item label="Synop" value="Synop" />
//         </Picker>
//       </View>

//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <Card containerStyle={styles.card}>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Message:</Text> {item.message}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Type:</Text> {item.type}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Station:</Text> {item.station}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Time:</Text>{" "}
//               {new Date(item.timestamp).toLocaleString()}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Wind Direction:</Text>{" "}
//               {item.wind_direction}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Wind Speed:</Text> {item.wind_speed}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Wind Unit:</Text> {item.wind_unit}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Visibility:</Text> {item.visibility}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Weather:</Text> {item.weather}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Temperature:</Text> {item.temperature}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Dew Point:</Text> {item.dew_point}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Pressure:</Text> {item.pressure}
//             </Text>
//             <Text style={styles.messageText}>
//               <Text style={styles.bold}>Remarks:</Text> {item.remarks}
//             </Text>
//           </Card>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.primary,
//   },
//   header: {
//     padding: 20,
//     marginBottom: 16,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     backgroundColor: colors.translucentWhite,
//   },
//   title: {
//     fontSize: 24,
//     color: colors.white,
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 30,
//     color: "black",
//     textAlign: "center",
//   },
//   pickerContainer: {
//     marginBottom: 16,
//     alignItems: "center",
//   },
//   pickerLabel: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: colors.white,
//   },
//   picker: {
//     width: 200,
//     color: colors.white,
//     borderBlockColor: "#FFFFFF",
//   },
//   card: {
//     backgroundColor: colors.translucentGray,
//     borderColor: colors.secondary,
//     borderWidth: 0,
//     borderRadius: 15,
//     padding: 16,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 4,
//     color: colors.white,
//   },
//   bold: {
//     fontWeight: "bold",
//     color: colors.white,
//   },
// });

// export default DashboardScreen;

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchMetars, fetchSynops } from "../api/api";
import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import SlidingUpPanel from "rn-sliding-up-panel";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import io from "socket.io-client";
import { theme } from "../utils/theme";

import { colors } from "../utils/colors";

const API_URL = "http://192.168.115.205:3000";

// // Color scheme based on gray tones
// export const colors = {
//   darkGray: "#2E2E2E",
//   mediumGray: "#4F4F4F",
//   lightGray: "#E0E0E0",
//   accentGray: "#A9A9A9",
//   translucentWhite: "rgba(255, 255, 255, 0.6)",
//   translucentDarkGray: "rgba(46, 46, 46, 0.8)",
// };

const DashboardScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [selectedType, setSelectedType] = useState("Metar");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const panelRef = useRef();
  const { user } = route.params;
  const socket = io(API_URL);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (selectedType === "Metar") {
          await fetchMetars(setMessages);
        }
        if (selectedType === "Synop") {
          await fetchSynops(setMessages);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadMessages();

    socket.on("mobile", (data) => {
      console.log(data);
      Alert.alert("New Weather Message", data.message);
      loadMessages();
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedType]);

  const handleGoBack = () => {
    // navigation.goBack();
    navigation.replace("login");
  };
  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedMessage(item);
        panelRef.current.show();
      }}
    >
      <Card containerStyle={styles.card}>
        <Text style={styles.messageText}>
          {/* <Text style={styles.bold}>Message:</Text> */}
          <MaterialCommunityIcons
            name="weather-cloudy"
            size={20}
            color={colors.black}
          />

          {"  " + item.message}
        </Text>
        {/* <Text style={styles.messageText}>
          <Text style={styles.bold}>Type:</Text> {item.type}
        </Text>
        <Text style={styles.messageText}>
          <Text style={styles.bold}>Station:</Text> {item.station}
        </Text> */}
        <Text style={styles.messageText}>
          {/* <Text style={styles.bold}>Time:</Text> */}
          <MaterialCommunityIcons
            name="clock-time-three-outline"
            size={20}
            color={colors.black}
          />
          {"  "}
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bg.png")}
        style={styles.bgImg}
        blurRadius={70}
      />
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"exit-outline"} color={colors.white} size={25} />
      </TouchableOpacity>
      {/* <LinearGradient
        colors={[colors.translucentWhite, colors.translucentDarkGray]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={handleGoBack}
        >
          <Ionicons name={"exit-outline"} color={colors.primary} size={25} />
        </TouchableOpacity> */}
      {/* <Text style={styles.title}>Welcome, {user.userData.name}</Text> */}
      {/* <Text style={styles.subtitle}>Weather Messages</Text> */}
      {/* </LinearGradient> */}

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Type:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedType}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setSelectedType(itemValue);
            }}
            dropdownIconColor={colors.white}
          >
            <Picker.Item label="Metar" value="Metar" />
            <Picker.Item label="Synop" value="Synop" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderCard}
      />
      <SlidingUpPanel ref={panelRef} draggableRange={{ top: 400, bottom: 0 }}>
        <View style={styles.panel}>
          {selectedMessage && (
            <>
              <Text style={styles.panelTitle}>Message Details</Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Message:</Text>{" "}
                {selectedMessage.message}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Type:</Text> {selectedMessage.type}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Station:</Text>{" "}
                {selectedMessage.station}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Time:</Text>{" "}
                {new Date(selectedMessage.timestamp).toLocaleString()}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Wind Direction:</Text>{" "}
                {selectedMessage.wind_direction}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Wind Speed:</Text>{" "}
                {selectedMessage.wind_speed}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Wind Unit:</Text>{" "}
                {selectedMessage.wind_unit}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Visibility:</Text>{" "}
                {selectedMessage.visibility}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Weather:</Text>{" "}
                {selectedMessage.weather}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Temperature:</Text>{" "}
                {selectedMessage.temperature}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Dew Point:</Text>{" "}
                {selectedMessage.dew_point}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Pressure:</Text>{" "}
                {selectedMessage.pressure}
              </Text>
              <Text style={styles.panelText}>
                <Text style={styles.bold}>Remarks:</Text>{" "}
                {selectedMessage.remarks}
              </Text>
            </>
          )}
        </View>
      </SlidingUpPanel>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  bgImg: {
    position: "absolute",
    height: height + 30,
    width: width,
  },
  header: {
    padding: 20,
    marginBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.translucentWhite,
  },
  title: {
    fontSize: 24,
    color: colors.darkGray,
    marginBottom: 8,
  },
  backButtonWrapper: {
    height: 35,
    width: 35,
    backgroundColor: theme.bgWhite(0.4),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 30,
    marginRight: 15,
  },
  subtitle: {
    fontSize: 30,
    color: colors.lightGray,
    textAlign: "center",
  },
  pickerContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.white,
  },
  pickerWrapper: {
    width: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accentGray,
    overflow: "hidden",
    // backgroundColor: colors.mediumGray,
    backgroundColor: theme.bgWhite(0.4),
  },
  picker: {
    color: colors.white,
    borderColor: colors.white,
  },
  card: {
    // backgroundColor: colors.mediumGray,
    backgroundColor: theme.bgWhite(0.4),
    // borderColor: colors.white,
    // borderWidth: 1,
    borderRadius: 15,
    // padding: 10,
    shadowColor: theme.bgWhite(0.0),
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  messageText: {
    fontSize: 16,
    marginVertical: 4,
    color: colors.white,
    // backgroundColor: theme.bgWhite(0.4),
  },
  bold: {
    fontWeight: "bold",
    color: colors.black,
  },
  panel: {
    flex: 1,
    backgroundColor: colors.darkGray,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelTitle: {
    fontSize: 24,
    marginBottom: 16,
    color: colors.black,
    textAlign: "center",
  },
  panelText: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.black,
  },
});

export default DashboardScreen;
// ***************************************************************************
