// src/components/AddPostForm.js
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { ADD_POST } from "../queries";

const AddPostForm = ({ navigation }) => {
  const [form, setForm] = useState({
    content: "",
    imageUrl: "",
    tags: "",
  });

  const [addPost, {}] = useMutation(ADD_POST, {
    onCompleted: (res) => {
      setForm({
        content: "",
        imageUrl: "",
        tags: "",
      });
      navigation.navigate("home");
    },
  });

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addPost({
        variables: {
          input: {
            content: form.content,
            imgUrl: form.imageUrl,
            tags: form.tags.split(",")
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Post</Text>
      <TextInput
        label="Content"
        value={form.content}
        onChangeText={(vl) => onChangeForm("content", vl)}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: "#1B75BB"}}}
      />
      <TextInput
        label="Image URL"
        value={form.imageUrl}
        onChangeText={(vl) => onChangeForm("imageUrl", vl)}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: "#1B75BB"}}}
      />
      <TextInput
        label="Tags"
        value={form.tags}
        onChangeText={(vl) => onChangeForm("tags", vl)}
        mode="outlined"
        style={styles.input}
        theme={{colors: {primary: "#1B75BB"}}}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button} theme={{colors: {primary: "#1B75BB"}}}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
},
button: {
    marginTop: 10,
  },
});

export default AddPostForm;
