import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Card,
  Text,
  Title,
  Subheading,
  Chip,
  Searchbar,
  Button,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating';

const DoctorDetailScreen = ({ route, navigation }) => {
    const { doctor } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
  
    // Dummy data for reviews (replace it with your actual data)
    const reviews = [
      { id: 1, name: 'John Doe', image: require('../assets/person1.jpg'), rating: 4, comment: 'Great doctor!' },
      { id: 2, name: 'Jane Smith', image: require('../assets/person2.jpg'), rating: 5, comment: 'Excellent service.' },
      { id: 3, name: 'Alex Johnson', image: require('../assets/person3.jpg') },
      // Add more reviews as needed
    ];
  
    let filteredReviews = reviews;
    if (searchQuery !== '') {
      filteredReviews = reviews.filter((review) =>
        review.comment.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    const handleAddReview = () => {
      navigation.navigate('Review', { doctor });
    };
  
    return (
      <ScrollView
        contentContainerStyle={styles.container} // Add this line
      >
        <Card style={styles.card}>
          <Card.Cover source={doctor.image} style={styles.doctorImage} />
          <Card.Content>
            <View style={styles.infoContainer}>
              <View style={styles.avatarContainer}>
                <Avatar.Image source={doctor.image} size={80} />
              </View>
              <View style={styles.detailsContainer}>
                <Title>{doctor.name}</Title>
                <Subheading>{doctor.profession}</Subheading>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={doctor.rating}
                  starSize={20}
                  fullStarColor="#F5C664"
                  containerStyle={styles.stars}
                />
                <View style={styles.chipContainer}>
                  <Chip icon="map-marker">{doctor.location}</Chip>
                  <Chip icon="clock-time-four-outline">{`${doctor.distance} miles`}</Chip>
                </View>
              </View>
            </View>
            <Text style={styles.description}>{doctor.description}</Text>
          </Card.Content>
        </Card>
  
        <View style={styles.reviewContainer}>
          <Title>Reviews</Title>
          <Button onPress={handleAddReview} style={styles.addButton}>
            <Text style={{ color: '#FFF' }}>Add a Review</Text>
          </Button>
          <Searchbar
            placeholder="Search reviews"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <FlatList
            data={filteredReviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.reviewCard}>
                <Card.Content>
                  <View style={styles.reviewInfoContainer}>
                    <Avatar.Image source={item.image} size={40} style={styles.avatar} />
                    <View style={styles.reviewDetails}>
                      <Text style={styles.reviewName}>{item.name}</Text>
                      <StarRating
                        disabled
                        maxStars={5}
                        rating={item.rating}
                        starSize={15}
                        fullStarColor="#F5C664"
                        containerStyle={styles.stars}
                      />
                      <Text style={styles.reviewCommentPreview}>{item.comment.slice(0, 50)}...</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      </ScrollView>
    );
  };
  
  // ... (unchanged styles)
  
  export default DoctorDetailScreen;
  