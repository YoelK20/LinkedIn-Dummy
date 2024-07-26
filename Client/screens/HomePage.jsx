import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";
import PostCard from "./components/Card";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";


export const HomePage = () => {
  const {error, loading, data} = useQuery(GET_POSTS)
  const renderItem = ({ item }) => <PostCard post={item} />;

  return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={data?.getPost}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});
