import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Title, Caption, Text, Button } from "react-native-paper";
import { GET_USER_PROFILE } from "../queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useFocusEffect } from "@react-navigation/native";

export const ProfilePage = ({ navigation }) => {
  const { deleteLoggedIn, token } = useContext(LoginContext);

  const handleLogout = async () => {
    await deleteLoggedIn();
    navigation.navigate("register");
  };
  const { error, loading, data } = useQuery(GET_USER_PROFILE);

  const profileData = data?.getMyProfile || {}
  // console.log(data?.getMyProfile?.name);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userInfoSection}>
        <Avatar.Text
          size={80}
          label={profileData.name?.charAt(0)}
          style={styles.avatar}
        />
        <Title style={styles.title}>{profileData.name}</Title>
        <Caption style={styles.caption}>@{profileData.username}</Caption>
      </View>

      <View style={styles.row}>
        <View style={styles.section}>
          <Text style={[styles.paragraph, styles.caption]}>
            {profileData.follower?.length}
          </Text>
          <Caption style={styles.caption}>Followers</Caption>
        </View>
        <View style={styles.section}>
          <Text style={[styles.paragraph, styles.caption]}>
            {profileData.following?.length}
          </Text>
          <Caption style={styles.caption}>Following</Caption>
        </View>
      </View>
      <Button mode="contained" style={styles.button} onPress={handleLogout}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  userInfoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    flexDirection: "row",
    marginVertical: 20,
  },
  section: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  paragraph: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
});
