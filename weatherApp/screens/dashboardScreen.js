import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchMetars, fetchSynops } from "../api/api";
// import axios from "axios";
import io from "socket.io-client";

const API_URL = "http://192.168.178.205:3000";
const DashboardScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [selectedType, setSelectedType] = useState("Metar");
  const { user } = route.params;
  const socket = io(API_URL);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (selectedType == "Metar") {
          const data = await fetchMetars(setMessages);
        }
        if (selectedType == "Synop") {
          const data = await fetchSynops(setMessages);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.userData.name}</Text>
      <Text style={styles.subtitle}>Weather Messages</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Type:</Text>
        <Picker
          selectedValue={selectedType}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedType(itemValue);
            useEffect;
          }}
        >
          <Picker.Item label="Metar" value="Metar" />
          <Picker.Item label="Synop" value="Synop" />
        </Picker>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Message:</Text> {item.message}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Type:</Text> {item.type}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Station:</Text> {item.station}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Time:</Text>{" "}
              {new Date(item.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Wind Direction:</Text>{" "}
              {item.wind_direction}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Wind Speed:</Text> {item.wind_speed}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Wind Unit:</Text> {item.wind_unit}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Visibility:</Text> {item.visibility}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Weather:</Text> {item.weather}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Temperature:</Text> {item.temperature}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Dew Point:</Text> {item.dew_point}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Pressure:</Text> {item.pressure}
            </Text>
            <Text style={styles.messageText}>
              <Text style={styles.bold}>Remarks:</Text> {item.remarks}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 30,
    marginBottom: 16,
    textAlign: "center",
  },
  pickerContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    width: 200,
  },
  messageContainer: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderColor: "#dcdcdc",
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
});
export default DashboardScreen;
