import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const UserCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{user?.name}</Title>
        <Paragraph>@{user?.username}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button buttonColor="#1B75BB" mode="contained" onPress={handleFollow}>
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default UserCard;
