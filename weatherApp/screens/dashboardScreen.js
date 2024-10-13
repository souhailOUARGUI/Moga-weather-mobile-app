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
  Button,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchMetars, fetchSynops, deleteMsg } from "../api/api";
import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import SlidingUpPanel from "rn-sliding-up-panel";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import io from "socket.io-client";
import { theme } from "../utils/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SlideUpPanel } from "./components/slideUpPanel";
import { colors } from "../utils/colors";
import { TempChart } from "./components/tempChart";

const API_URL = "https://moga-weather-api.onrender.com";

const DashboardScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [selectedType, setSelectedType] = useState("Metar");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterMessages, setFilterMessages] = useState([]);
  const [filterDate, setFilterDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const toggleDatepicker = () => {
    setOpen(!open);
  };

  const onDateChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || filterDate;
      setFilterDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
      }
    } else {
      r;
      toggleDatepicker();
    }
  };

  const panelRef = useRef();
  const { user } = route.params;
  const socket = io(API_URL);

  const loadMessages = async () => {
    try {
      if (selectedType === "Metar") {
        await fetchMetars(setMessages, setFilterMessages);
      }
      if (selectedType === "Synop") {
        await fetchSynops(setMessages, setFilterMessages);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    socket.on("mobile", (data) => {
      console.log(data);
      Alert.alert("New Weather Message", data.message);
      loadMessages();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setMessages(
      filterMessages.filter(
        (msg) =>
          msg.timestamp.split("T")[0] === filterDate.toISOString().split("T")[0]
      )
    );
  }, [filterDate]);

  useEffect(() => {
    loadMessages();
    // console.log(user.userData.role);
  }, [selectedType]);

  const handleGoBack = () => {
    // navigation.goBack();
    navigation.replace("login");
  };

  // Render Message Card
  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedMessage(item);
        panelRef.current.show();
      }}
    >
      <Card containerStyle={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginHorizontal: 10,
          }}
        >
          <Text style={styles.messageText}>
            <MaterialCommunityIcons
              name="weather-cloudy"
              size={20}
              color={colors.black}
            />
            {"  " + item.message}
          </Text>

          {user.userData.role === "admin" ? (
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() => deleteMsg(item._id, loadMessages)}
            >
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {/* date */}
          <Text style={styles.messageText}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={colors.black}
            />
            {"  "}
            {new Date(item.timestamp).toLocaleString().split(",")[0]}
          </Text>
          {/* time */}
          <Text style={styles.messageText}>
            <MaterialCommunityIcons
              name="clock-time-three-outline"
              size={20}
              color={colors.black}
            />
            {"  "}
            {new Date(item.timestamp).toLocaleString().split(",")[1]}
          </Text>
        </View>
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
      <View style={styles.header}>
        <Text style={{ fontSize: 25, fontWeight: "700", color: colors.white }}>
          hello, {user.userData.name}
        </Text>
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={handleGoBack}
        >
          <Ionicons name={"exit-outline"} color={colors.white} size={25} />
        </TouchableOpacity>
      </View>
      {/* <TempChart messages={messages} /> */}
      {/* {messages.length > 0 ? (
        <TempChart messages={messages} />
      ) : (
        <Text
          style={{ color: colors.white, textAlign: "center", marginTop: 20 }}
        >
          Loading data...
        </Text>
      )} */}
      {open && (
        <DateTimePicker
          value={filterDate}
          mode="date"
          display="spinner"
          onChange={onDateChange}
        ></DateTimePicker>
      )}

      <View style={styles.pickerContainer}>
        {/* <Text style={styles.pickerLabel}>Select Type</Text> */}
        <Pressable onPress={toggleDatepicker}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons
              name="clock-edit-outline"
              size={20}
              style={{ marginHorizontal: 5 }}
              color={colors.white}
            ></MaterialCommunityIcons>
            <Text style={styles.title}>Date filter</Text>
            {/* <TextInput placeholder="search message"></TextInput> */}
          </View>
        </Pressable>
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
      <SlideUpPanel
        styles={styles}
        selectedMessage={selectedMessage}
        panelRef={panelRef}
      ></SlideUpPanel>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 15,
    marginHorizontal: 15,
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    color: colors.darkGray,
    // marginBottom: 8,
  },
  backButtonWrapper: {
    height: 35,
    width: 35,
    backgroundColor: theme.bgWhite(0.4),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    // marginTop: 30,
    marginRight: 15,
  },
  subtitle: {
    fontSize: 30,
    color: colors.lightGray,
    textAlign: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.white,
  },
  searchBar: {
    flexDirection: "row",
    height: 55,
    borderWidth: 1,
    width: 140,
    // marginTop: 10,
    // marginHorizontal: 15,
    borderRadius: 20,
    borderColor: colors.accentGray,
    // alignItems: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 10,
    backgroundColor: theme.bgWhite(0.6),
  },
  pickerWrapper: {
    width: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accentGray,
    overflow: "hidden",

    // backgroundColor: colors.mediumGray,
    backgroundColor: theme.bgWhite(0.4),
  },
  picker: {
    color: colors.white,
    borderColor: colors.white,
    backgroundColor: theme.bgWhite(0.3),
  },
  card: {
    // backgroundColor: colors.mediumGray,
    backgroundColor: theme.bgWhite(0.4),
    // borderColor: colors.white,
    // borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    shadowColor: theme.bgWhite(0.0),
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  messageText: {
    fontSize: 16,
    marginVertical: 2,
    color: colors.white,
    textAlign: "center",
    // backgroundColor: theme.bgWhite(0.4),
  },
  bold: {
    fontWeight: "bold",
    color: colors.black,
  },
  panel: {
    flex: 1,
    // backgroundColor: colors.darkGray,
    backgroundColor: theme.bgWhite(1),
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
  viewChart: {
    backgroundColor: "#212B34",
    margin: 10,
    height: 160,
  },
});

export default DashboardScreen;
// ***************************************************************************
