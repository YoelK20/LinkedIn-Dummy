import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserCard from "./components/UserCard";
import CustomSearchBar from "./components/SearchBar";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER } from "../queries";

export const SearchUser = () => {
  // const {error, loading, data} = useQuery(GET_USER_DATA)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUser, { error, loading, data }] = useLazyQuery(SEARCH_USER);
  const datas = data?.getUserByQuery;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    searchUser({ variables: { query: query } });
  };

  return (
    <View style={styles.container}>
      <CustomSearchBar
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
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
