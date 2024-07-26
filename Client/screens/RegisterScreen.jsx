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
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DO_REGISTER } from "../queries";
import { ActivityIndicator } from "react-native-paper";

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [registerFunction, { data, loading, error }] = useMutation(
    DO_REGISTER,
    {
      onCompleted: (res) => {
        setForm({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        navigation.navigate("login");
      },
    }
  );

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleRegister = async () => {
    try {
      await registerFunction({
        variables: {
          input: {
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.safeArea}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.textContainer1}>
        <Text style={styles.textStyle}>Join LinkedIn</Text>
        <View style={styles.textContainer2}>
          <Text style={styles.textStyle1}>or </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color="#1B75BB" />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(val) => onChangeForm("name", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={form.username}
            onChangeText={(val) => onChangeForm("username", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(val) => onChangeForm("email", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(val) => onChangeForm("password", val)}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
