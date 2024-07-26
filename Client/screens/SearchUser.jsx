import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import UserCard from "./components/UserCard";
import CustomSearchBar from "./components/SearchBar";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER } from "../queries";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, { data }] = useLazyQuery(SEARCH_USER);

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
      <ScrollView>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
