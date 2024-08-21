import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const SlideUpPanel = ({ styles, selectedMessage, panelRef }) => {
  //   const panelRef = useRef();
  return (
    <SlidingUpPanel ref={panelRef} draggableRange={{ top: 600, bottom: 0 }}>
      <View style={styles.panel}>
        {selectedMessage && (
          <>
            <Text style={styles.panelTitle}>
              <MaterialCommunityIcons
                name="weather-partly-rainy"
                size={30}
              ></MaterialCommunityIcons>{" "}
              Message Details
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {/* <Text style={styles.bold}>Message:</Text> */}{" "}
              {selectedMessage.message}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="weather-fog"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Type:</Text> {selectedMessage.type}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Station:</Text>{" "}
              {selectedMessage.station}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Time:</Text>{" "}
              {new Date(selectedMessage.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="windsock"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Wind Direction:</Text>{" "}
              {selectedMessage.wind_direction}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="weather-windy-variant"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Wind Speed:</Text>{" "}
              {selectedMessage.wind_speed}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="weather-windy"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Wind Unit:</Text>{" "}
              {selectedMessage.wind_unit}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="eye-outline"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Visibility:</Text>{" "}
              {selectedMessage.visibility}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="weather-cloudy"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Weather:</Text>{" "}
              {selectedMessage.weather}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="temperature-celsius"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Temperature:</Text>{" "}
              {selectedMessage.temperature}
            </Text>
            <Text style={styles.panelText}>
              <MaterialIcons name="dew-point" size={30}></MaterialIcons>{" "}
              <Text style={styles.bold}>Dew Point:</Text>{" "}
              {selectedMessage.dew_point}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="weather-tornado"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Pressure:</Text>{" "}
              {selectedMessage.pressure}
            </Text>
            <Text style={styles.panelText}>
              <MaterialCommunityIcons
                name="note-edit-outline"
                size={30}
              ></MaterialCommunityIcons>{" "}
              <Text style={styles.bold}>Remarks:</Text>{" "}
              {selectedMessage.remarks}
            </Text>
          </>
        )}
      </View>
    </SlidingUpPanel>
  );
};
