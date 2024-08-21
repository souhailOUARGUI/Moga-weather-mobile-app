import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.3.81:3000";

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
        navigation.navigate("dashboard", { user });
        // return res.data;
      })
      .catch((error) => {
        console.error("login failed");
      });
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password, name, role, navigation) => {
  try {
    const response = await axios
      .post(`${API_URL}/users/register`, {
        email,
        password,
        name,
        role,
      })
      .then((res) => {
        // console.log("register successful");
        Alert.alert("Success!", `${user.userData.name} created successfully!`);
        console.log(res.data);
        const user = res.data;
        navigation.navigate("dashboard", { user });
      })
      .catch((error) => {
        console.error("signup failed");
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
        setMessages(res.data);
        setFilterMessages(res.data);

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
        setMessages(res.data);
        setFilterMessages(res.data);

        return res.data;
      });
    // return response.data;
  } catch (error) {
    throw error;
  }
};
