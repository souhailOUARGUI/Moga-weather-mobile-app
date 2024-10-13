import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { register } from "../api/api";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { theme } from "../utils/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [secureEntery, setSecureEntery] = useState(true);

  const handleSignup = async () => {
    try {
      const user = await register(email, password, name, role, navigation);
    } catch (error) {
      console.error(error);
      Alert.alert("signUp failed");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleLogin = () => {
    navigation.navigate("login");
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
          <Text style={styles.headingText}>Sign Up</Text>
          <Image
            style={styles.signupImg}
            source={require("../assets/images/Sign_up_cuate.png")}
          />
          {/* <Text style={styles.headingText}></Text> */}
        </View>
        {/* form  */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={"man-outline"} size={30} color={colors.white} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor={colors.secondary}
              keyboardType="name-phone-pad"
              onChangeText={setName}
            />
          </View>
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
          <View style={styles.inputContainer}>
            <Ionicons name={"id-card-outline"} size={30} color={colors.white} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your role"
              placeholderTextColor={colors.secondary}
              keyboardType="name-phone-pad"
              onChangeText={setRole}
            />
          </View>

          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={() => {
              console.log("signup");
              handleSignup();
            }}
          >
            <Text style={styles.loginText}>Sign up</Text>
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
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signupText}>Login</Text>
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
    marginTop: 15,
    marginBottom: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",

    marginVertical: 5,
  },
  headingText: {
    textAlign: "center",
    fontSize: 40,
    color: colors.white,
    marginBottom: 5,
    // fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 100,
    height: 45,
    paddingHorizontal: 20,
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
    borderRadius: 100,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
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
  signupImg: {
    height: height * 0.3,
    width: width * 0.7,
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

export default SignupScreen;
