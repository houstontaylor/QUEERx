// screens/DoctorDetailScreen.js
import React from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';

// Dummy data for doctors and reviews
const dummyDoctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      description: 'Expert in heart health.',
      rating: 4.5,
      location: '123 Main St, Cityville',
      phone: '555-1234',
      reviews: [
        { id: 1, user: 'Alice', rating: 5, comment: 'Great doctor!' },
        { id: 2, user: 'Bob', rating: 4, comment: 'Helpful and knowledgeable.' },
      ],
    },
    // Add more dummy doctor data as needed
  ];

function DoctorDetailScreen({ route, navigation }) {
  const { doctor } = route.params;

  const handleReview = (doctor) => {
    // Navigate to the DoctorDetailScreen with the selected doctor's data
    navigation.navigate('Review', { doctor, navigation });
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Image
        source={'../assets/'}
        style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center', marginBottom: 10 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{doctor.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{doctor.specialty}</Text>
      <Text style={{ marginBottom: 10 }}>{doctor.description}</Text>
      <Text style={{ marginBottom: 10 }}>Rating: {doctor.rating}</Text>
      <Text style={{ marginBottom: 10 }}>Location: {doctor.location}</Text>
      <Text style={{ marginBottom: 10 }}>Phone: {doctor.phone}</Text>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Reviews</Text>
      {doctor.reviews ? (
        doctor.reviews.map((review) => (
          <View key={review.id} style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{review.user}</Text>
            <Text>{review.rating} stars</Text>
            <Text>{review.comment}</Text>
          </View>
        ))
      ) : (
        <Text>No reviews available.</Text>
      )}

      <Button title="Add a Review" onPress={handleReview} />
    </ScrollView>
  );
}

export default DoctorDetailScreen;
