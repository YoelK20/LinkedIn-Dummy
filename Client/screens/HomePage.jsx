import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";
import PostCard from "./components/Card"; // Import the PostCard component

// Sample data
const data = [
  {
    _id: "669f9fd4f8be8984f952e264",
    content: "Mari bergabung bersama kami, pinjam dengan kami agar makin gacor",
    tags: ["Judi Online", "Pinjaman bunga tinggi"],
    imgUrl: "https://t-2.tstatic.net/palembang/foto/bank/images/adakami.jpg",
    author: { name: "Tiara", username: "Tiwul" },
    comments: [{ content: "Bunganya berapa persen kk ?", username: "Arif" }],
    likes: [],
  },
  {
    _id: "669f9cc0f8be8984f952e261",
    content: "Welcome to My Air Flight",
    tags: ["Penerbangan Kaum Atas", "Private Flight"],
    imgUrl:
      "https://i0.wp.com/www.habanaija.com/wp-content/uploads/2014/01/Photoxpress_1672314.jpg",
    author: { name: "Naufal", username: "naufaljundi" },
    comments: [{ content: "1 Trip berapaan bosqu ?", username: "YoelK" }],
    likes: [],
  },
  {
    _id: "669f80e30d43a7fbd0fb0e93",
    content: "CEO Farhan",
    tags: ["Perusahaan Gacor"],
    imgUrl: "https://miro.medium.com/max/2400/1*d-g0PujbTCUgtT8691xdSQ.png",
    author: { name: "Yoel", username: "YoelK" },
    comments: [
      { content: "Salam Gacor", username: "YoelK" },
      { content: "Kapan Giveaway mobil lagi Bg ?", username: "YoelK" },
    ],
    likes: [{ username: "YoelK" }],
  },
];

// HomePage component
export const HomePage = () => {
  const renderItem = ({ item }) => <PostCard post={item} />;

  return (
    // <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    // </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});
