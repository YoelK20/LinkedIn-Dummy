import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/LogoLinkedIn.png";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.textContainer1}>
        <Text style={styles.textStyle}>Sign In</Text>
        <View style={styles.textContainer2}>
          <Text style={styles.textStyle1}>or </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.linkText}>Join LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          // value={email}
          // onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          // value={password}
          // onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    marginTop: "2.5%",
    alignItems: "flex-start",
    paddingLeft: "2%",
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    alignItems: "flex-start",
  },
  textContainer1: {
    paddingLeft: "3%",
  },
  textContainer2: {
    flexDirection: "row",
    paddingTop: "2%",
  },
  textStyle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  textStyle1: {
    fontSize: 15,
    color: "gray",
  },
  linkText: {
    paddingLeft: "0.5%",
    fontSize: 15,
    fontWeight: "bold",
    color: "#1B75BB",
  },
  inputContainer: {
    marginTop: "20%",
    width: "95%",
    paddingLeft: "4%",
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: "3%",
    paddingHorizontal: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    backgroundColor: "#1B75BB",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: "3%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
