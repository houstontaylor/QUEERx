// screens/DoctorDetailScreen.js
import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';

function DoctorDetailScreen({ route, navigation }) {
  const { doctor } = route.params;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Image
        source={{ uri: 'doctor-profile-picture-url' }} // Replace with the actual URL or local path
        style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center', marginBottom: 10 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{doctor.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{doctor.specialty}</Text>
      <Text style={{ marginBottom: 10 }}>{doctor.description}</Text>
      <Text style={{ marginBottom: 10 }}>Rating: {doctor.rating}</Text>
      <Text style={{ marginBottom: 10 }}>Location: {doctor.location}</Text>
      <Text style={{ marginBottom: 10 }}>Phone: {doctor.phone}</Text>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Reviews</Text>
      {doctor.reviews.map((review) => (
        <View key={review.id} style={{ marginBottom: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>{review.user}</Text>
          <Text>{review.rating} stars</Text>
          <Text>{review.comment}</Text>
        </View>
      ))}

      <Button title="Write a Review" onPress={handleReview} />
    </ScrollView>
  );
}

export default DoctorDetailScreen;
