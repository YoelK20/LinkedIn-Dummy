import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Chip,
  Avatar,
  List,
  Divider,
  Button,
  TextInput,
  Appbar,
  ActivityIndicator,
} from "react-native-paper";
import { GET_POSTS_DETAIL } from "../queries";

const PostDetail = ({ navigation, route }) => {
  const { post_id } = route.params;

  const [detail, { data, loading, error }] = useLazyQuery(GET_POSTS_DETAIL);
  const [post, setPost] = useState(null);

  useEffect(() => {
    detail({ variables: { getPostByIdId: post_id } });
  }, [post_id]);

  useEffect(() => {
    if (data && data.getPostById) {
      setPost(data.getPostById);
      setLikes(data.getPostById.likes.length)
      setComments(data.getPostById.comments)
    }
  }, [data]);

  console.log(post);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        content: newComment,
        username: "currentUsername",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      detail({ variables: { getPostByIdId: post_id } });
    //   setComments([...comments, newCommentObj]);
    //   setNewComment("");
    }
  };

  return (
        <View style={{ flex: 1, marginTop: "-10%" }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
        </Appbar.Header>
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Card>
            <Card.Cover source={{ uri: post?.imgUrl }} />
            <Card.Content>
              <Title>{post?.content}</Title>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginVertical: 8,
                }}
              >
                {post && post.tags.map((tag, index) => (
                    <Chip key={index} style={{ marginRight: 4, marginBottom: 4 }}>{tag}</Chip>
                  ))}
              </View>
              <Paragraph>
                by {post?.author?.name} (@{post?.author?.username})
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="thumb-up"
                mode="contained"
                onPress={handleLike}
                theme={{ colors: { primary: "#1B75BB" } }}
              >
                Like ({likes})
              </Button>
            </Card.Actions>
          </Card>
  
          <List.Section title="Comments" style={{ marginTop: 16 }}>
            {post && post.comments.map((comment, index) => (
                <View key={index}>
                  <List.Item
                    title={comment.username}
                    description={comment.content}
                    left={() => <Avatar.Text size={36} label={comment.username.charAt(0)} />}
                  />
                  {index < comments.length - 1 && <Divider />}
                </View>
              ))}
          </List.Section>
  
          <TextInput
            label="Add a comment"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
            style={{ marginBottom: 16 }}
          />
          <Button
            mode="contained"
            onPress={handleAddComment}
            theme={{ colors: { primary: "#1B75BB" } }}
          >
            Submit
          </Button>
        </ScrollView>
      </View>

  );

  //   return <></>;
};

export default PostDetail;
