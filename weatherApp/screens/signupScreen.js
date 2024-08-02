import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { register } from "../api/api";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      const user = await register(email, password, name, role, navigation);
    } catch (error) {
      console.error(error);
      alert("signUp failed");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-400">
      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>Role</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} />
      <Button title="register" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SignupScreen;
