import { useLazyQuery, useMutation } from "@apollo/client";
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
import { ADD_COMMENT, ADD_LIKES, GET_POSTS_DETAIL } from "../queries";

const PostDetail = ({ navigation, route }) => {
  const { post_id } = route.params; // Assume we get post_id from the previous screen

  const [detail, { data, loading, error }] = useLazyQuery(GET_POSTS_DETAIL, {
    variables: { getPostByIdId: post_id },
  });

  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState(null);

  const [addComments] = useMutation(ADD_COMMENT, {
    onCompleted: (res) => {
      setNewComment("");
      detail();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const [addLikes] = useMutation(ADD_LIKES, {
    onCompleted: (res) => {

      detail();
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleLike = async () => {
    try {
      await addLikes({
        variables: {
          input: {
            postId: postData._id,
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      await addComments({
        variables: {
          input: {
            content: newComment,
            postId: postData._id,
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detail();
  }, [post_id]);

  useEffect(() => {
    if (data && data.getPostById) {
      setPostData(data.getPostById);
      setLikes(data.getPostById.likes.length);
      setComments(data.getPostById.comments);
    }
  }, [data]);

  if (loading) {
    return <ActivityIndicator size="large" color="#1B75BB" />;
  }

  if (!postData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1B75BB" />
        <Paragraph>Loading...</Paragraph>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: "-10%" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Card>
          <Card.Cover source={{ uri: postData.imgUrl }} />
          <Card.Content>
            <Title>{postData.content}</Title>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginVertical: 8,
              }}
            >
              {postData.tags.map((tag, index) => (
                <Chip key={index} style={{ marginRight: 4, marginBottom: 4 }}>{tag}</Chip>
              ))}
            </View>
            <Paragraph>
              by {postData?.author?.name} (@{postData?.author?.username})
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
          {comments.map((comment, index) => (
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
};

export default PostDetail;
