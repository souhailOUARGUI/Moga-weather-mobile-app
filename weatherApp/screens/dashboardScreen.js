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
import { fetchMetars, fetchSynops } from "../api/api";
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

const API_URL = "http://192.168.3.81:3000";

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
    setMessages(
      filterMessages.filter(
        (msg) =>
          msg.timestamp.split("T")[0] === filterDate.toISOString().split("T")[0]
      )
    );
  }, [filterDate]);

  useEffect(() => {
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

  // Render Message Card
  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedMessage(item);
        panelRef.current.show();
      }}
    >
      <Card containerStyle={styles.card}>
        <Text style={styles.messageText}>
          <MaterialCommunityIcons
            name="weather-cloudy"
            size={20}
            color={colors.black}
          />
          {"  " + item.message}
        </Text>
        <Text style={styles.messageText}>
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
    padding: 20,
    marginBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.translucentWhite,
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
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 20,
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
    // backgroundColor: colors.darkGray,
    backgroundColor: theme.bgWhite(0.75),
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
