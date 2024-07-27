import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserCard from "./components/UserCard";
import CustomSearchBar from "./components/SearchBar";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_DATA, SEARCH_USER } from "../queries";

export const SearchUser = () => {
  // const {data, loading, error} = useQuery(GET_USER_DATA)
  const [searchQuery, setSearchQuery] = useState("");
  // const users = data?.getUsers
  // const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchUser, { data }] = useLazyQuery(SEARCH_USER);
  // console.log(data._id);
  const datas = data?.getUserByQuery || {};
  // console.log(datas.name);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    searchUser({ variables: { query: searchQuery } });
    console.log(data);
  };

  // const onSearch = () => {
  //   searchUser({variables: {query: searchQuery}})
  // };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        // onSearch={}
        setSearchQuery={setSearchQuery}
      />
      <FlatList
        data={datas}
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
