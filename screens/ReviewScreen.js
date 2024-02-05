// screens/ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Rating } from 'react-native';

function ReviewScreen({ route, navigation }) {
  const { doctor } = route.params;
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const handleReviewSubmit = () => {
    // Perform the submission of the review (you might want to send this data to your server)
    const newReview = {
      user: userName,
      rating,
      comment: reviewComment,
    };

    // Here, you can update the doctor's reviews in your state or trigger an API call to update the server
    doctor.reviews.push(newReview);

    // Navigate back to the DoctorDetailScreen
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Write a Review</Text>
      
      <TextInput
        placeholder="Your Name"
        value={userName}
        onChangeText={(text) => setUserName(text)}
        style={{ marginBottom: 10, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
      />

      <Rating
        showRating
        onFinishRating={(value) => setRating(value)}
        style={{ marginBottom: 20 }}
      />

      <TextInput
        placeholder="Write your review here"
        value={reviewComment}
        onChangeText={(text) => setReviewComment(text)}
        multiline
        numberOfLines={4}
        style={{ marginBottom: 20, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
      />

      <Button title="Submit Review" onPress={handleReviewSubmit} />
    </View>
  );
}

export default ReviewScreen;
