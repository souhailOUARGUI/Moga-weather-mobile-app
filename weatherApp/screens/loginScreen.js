import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { login } from "../api/api";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { theme } from "../utils/theme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntery, setSecureEntery] = useState(true);

  const handleLogin = async () => {
    try {
      const user = await login(email, password, navigation);
    } catch (error) {
      console.error(error);
      // alert("Login failed");
      Alert.alert("login failed");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleSignup = () => {
    navigation.navigate("signup");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image
          source={require("../assets/images/bg.png")}
          style={styles.bgImg}
          blurRadius={70}
        />
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={handleGoBack}
        >
          <Ionicons
            name={"arrow-back-outline"}
            color={colors.primary}
            size={25}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {/* <Text style={styles.headingText}>Hey,</Text> */}
          {/* <Text style={styles.headingText}>Welcome</Text> */}
          <Text style={styles.headingText}>Please sign In</Text>
          <Image
            style={styles.loginImg}
            source={require("../assets/images/Login_cuate.png")}
          />
        </View>

        {/* form  */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={"mail-outline"} size={30} color={colors.white} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={colors.white} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={colors.secondary}
              secureTextEntry={secureEntery}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntery((prev) => !prev);
              }}
            >
              <SimpleLineIcons
                name={"eye"}
                size={20}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={() => {
              // console.log("hey");
              handleLogin();
            }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          {/* <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity> */}
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  bgImg: {
    position: "absolute",
    height: height + 30,
    width: width,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  headingText: {
    fontSize: 40,
    color: colors.white,
    marginBottom: 5,
    // fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    height: 45,
    borderRadius: 100,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: colors.white,
    // fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.white,
    // fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    // backgroundColor: colors.primary,
    backgroundColor: theme.bgWhite(0.4),

    width: 150,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  loginImg: {
    width: width * 0.7,
    height: height * 0.35,
  },

  loginText: {
    color: colors.white,
    fontSize: 20,
    // fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    fontSize: 14,
    // fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    // fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.white,
    // fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.info,
    // fontFamily: fonts.Bold,
  },
});

export default LoginScreen;
