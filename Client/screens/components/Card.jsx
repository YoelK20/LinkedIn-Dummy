import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Title, Paragraph, Chip } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';


// PostCard component
const PostCard = ({ post }) => (
  <Card style={styles.card}>
    <Card.Cover source={{ uri: post.imgUrl }} style={styles.image} />
    <Card.Content>
      <Title>{post.content}</Title>
      <Paragraph>{post.author.username}</Paragraph>
      <View style={styles.tagsContainer}>
        {post.tags.map((tag, tagIndex) => (
          <Chip key={tagIndex} style={styles.tag}>
            {tag}
          </Chip>
        ))}
      </View>
    </Card.Content>
    <Card.Actions>
      <View style={styles.actions}>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
          <AntDesign name="like1" style={styles.icon} />
            <Paragraph>{post.likes.length}</Paragraph>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Paragraph style={styles.icon}>💬</Paragraph>
            <Paragraph>{post.comments.length}</Paragraph>
          </View>
        </TouchableOpacity>
      </View>
    </Card.Actions>
  </Card>
);

// Styles
const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    height: 200,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  tag: {
    margin: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "blue",
    marginRight: 4,
  },
});

export default PostCard;
