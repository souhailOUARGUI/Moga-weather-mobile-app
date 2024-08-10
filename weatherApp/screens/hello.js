import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
// import { useFonts } from "expo-font";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("login");
  };

  const handleSignup = () => {
    navigation.navigate("signup");
    const { width, height } = Dimensions.get("window");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bg.png")}
        style={styles.bgImg}
        blurRadius={70}
      />
      <Image
        source={require("../assets/images/meteoLogo.jpg")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/images/partlycloudy.png")}
        style={styles.bannerImage}
      />

      <Text style={styles.title}>
        Application de supervision météorologique
      </Text>
      <Text style={styles.subTitle}>
        superviseur de poche pour les messages Metars et Synops
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    // margin: 5,
  },
  bgImg: {
    position: "absolute",
    height: height + 30,
    width: width,
  },
  logo: {
    height: 90,
    width: 75,
    // marginVertical: 15,
    marginTop: 40,
  },
  bannerImage: {
    marginVertical: 10,
    height: 260,
    width: 260,
  },
  title: {
    fontSize: 40,
    // fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.white,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.secondary,
    // fontFamily: fonts.Medium,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.gray,
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    // color: colors.white,
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    // fontFamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 18,
    color: colors.white,
    // fontFamily: fonts.SemiBold,
  },
});
