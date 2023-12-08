import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import StarRating from 'react-native-star-rating';

const ReviewDetailScreen = ({ route }) => {
  const { reviewer } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <Avatar.Image source={reviewer.image} size={80} style={styles.avatar} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.reviewName}>{reviewer.name}</Text>
          {/* Add identities under the name if available */}
          {reviewer.identities && (
            <Text style={styles.reviewIdentities}>{reviewer.identities}</Text>
          )}
        </View>
        <View style={styles.starsContainer}>
          <StarRating
            disabled
            maxStars={5}
            rating={reviewer.rating}
            starSize={20}
            fullStarColor="#F5C664"
            containerStyle={styles.stars}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.reviewComment}>{reviewer.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  avatar: {
    marginBottom: 16,
  },
  reviewName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewIdentities: {
    fontSize: 16,
    color: '#666',
  },
  starsContainer: {
    marginLeft: 'auto', // Push stars to the right
  },
  stars: {
    marginVertical: 8,
  },
  separator: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  reviewComment: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ReviewDetailScreen;

