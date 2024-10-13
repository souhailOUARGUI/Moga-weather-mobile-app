import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_URL = "https://moga-weather-api.onrender.com";

export const login = async (email, password, navigation) => {
  try {
    const response = await axios
      .post(`${API_URL}/users/login`, {
        email,
        password,
      })
      .then((res) => {
        // console.log("login successful");
        const user = res.data;
        // Alert.alert(
        //   "Success!",
        //   `${user.userData.name} has successfully signed in!`
        // );
        navigation.navigate("home", { user });
        // return res.data;
      })
      .catch((error) => {
        Alert.alert("login failed", `${error}`);
        console.error("login failed");
      });
  } catch (error) {
    throw error;
  }
};
export const deleteMsg = async (msg_id, loadMessages) => {
  try {
    await axios
      .delete(`${API_URL}/messages/metars/${msg_id}`)
      .then((res) => {
        console.log(res.data);
        loadMessages();
        return res.data;
        // Alert.alert("Success!", res.data);
      })
      .catch((error) => {
        Alert.alert("error!", error);
      });
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password, name, role, navigation) => {
  try {
    console.log({ email, password, name, role });
    const response = await axios
      .post(`${API_URL}/users/register`, {
        email,
        password,
        name,
        role,
      })
      .then((res) => {
        // console.log("register successful");
        Alert.alert("Success!", `user created successfully!`);
        console.log(res.data);
        const user = res.data;
        navigation.navigate("dashboard", { user });
      })
      .catch((error) => {
        console.error("signup failed", error);
      });
    // return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMetars = async (setMessages, setFilterMessages) => {
  try {
    const response = await axios
      .get(`${API_URL}/messages/metars`)
      .then((res) => {
        // console.log(res.data);
        // const sortedMsgs = res.data.sort(
        //   (a, b) => a.date.getTime() - b.date.getTime()
        // );
        setFilterMessages(res.data);
        // setMessages(res.data);
        setMessages(
          res.data.filter(
            (msg) =>
              msg.timestamp.split("T")[0] ===
              new Date().toISOString().split("T")[0]
          )
        );

        return res.data;
      });
  } catch (error) {
    throw error;
  }
};

export const fetchSynops = async (setMessages, setFilterMessages) => {
  try {
    const response = await axios
      .get(`${API_URL}/messages/synops`)
      .then((res) => {
        setFilterMessages(res.data);
        setMessages(
          res.data.filter(
            (msg) =>
              msg.timestamp.split("T")[0] ===
              new Date().toISOString().split("T")[0]
          )
        );
        // console.log();
        // console.log(res.data);

        return res.data;
      });
    // return response.data;
  } catch (error) {
    throw error;
  }
};
