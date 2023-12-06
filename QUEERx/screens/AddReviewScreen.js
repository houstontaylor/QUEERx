// AddReviewScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Avatar, Card, Title, Subheading, Chip, Button } from 'react-native-paper';
import StarRating from 'react-native-star-rating';

const AddReviewScreen = ({ route }) => {
  const { doctor } = route.params;
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    // Handle submitting the review (e.g., send to server)
    console.log('Submitting Review:', { name, rating, comment, doctor });
    // Add logic to send the review data to your backend or handle it accordingly
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={doctor.image} style={styles.doctorImage} />
        <Card.Content>
          <View style={styles.infoContainer}>
            {/* ... (unchanged code) */}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.reviewContainer}>
        <Title>Add a Review</Title>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <StarRating
          maxStars={5}
          rating={rating}
          starSize={30}
          fullStarColor="#F5C664"
          containerStyle={styles.stars}
          selectedStar={(selectedRating) => setRating(selectedRating)}
        />
        <TextInput
          style={styles.input}
          placeholder="Write your review..."
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <Button mode="contained" onPress={handleSubmitReview} style={styles.submitButton}>
          Submit Review
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 16,
  },
  doctorImage: {
    height: 200,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reviewContainer: {
    margin: 16,
  },
  stars: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#306B70',
  },
});

export default AddReviewScreen;