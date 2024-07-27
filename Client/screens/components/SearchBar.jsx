import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { SEARCH_USER } from "../../queries";
import { useLazyQuery } from "@apollo/client";

const CustomSearchBar = ({ searchQuery, onChangeSearch, onSearch, setSearchQuery }) => {

  const [searchQuerys, setSearchQuerys] = useState("");
  const [searchUser, {data, loading, error}] = useLazyQuery(SEARCH_USER);
    const onChangeSearchs = (query) => {
      setSearchQuerys(query);
    };
    const onSearchs = () => {
        searchUser({
        variables: {
            query: searchQuerys
        }
    })
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
      {/* <Button
        mode="contained"
        onPress={onSearch}
        style={styles.searchButton}
        theme={{ colors: { primary: "#1B75BB" } }}
      >
        Search
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
  },
});

export default CustomSearchBar;
