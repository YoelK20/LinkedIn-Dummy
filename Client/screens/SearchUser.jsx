import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserCard from "./components/UserCard";
import CustomSearchBar from "./components/SearchBar";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_DATA, SEARCH_USER } from "../queries";



export const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {data, loading, error} = useQuery(GET_USER_DATA)
  const users = data?.getUsers
  const [filteredUsers, setFilteredUsers] = useState(users);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const onSearch = () => {
    if (searchQuery) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        onSearch={onSearch}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
