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
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

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

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleExpandButtonPress = () => {
    toggleDescription();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={toggleDescription}>
          <Card.Cover source={doctor.image} style={styles.doctorImage} />
        </TouchableOpacity>
        <Card.Content style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.avatarContainer}>
              <Avatar.Image source={doctor.image} size={80} />
            </View>
            <View style={styles.detailsContainer}>
              <Title>{doctor.name}</Title>
              <Subheading>{doctor.profession}</Subheading>
              <View style={styles.starsContainer}>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={doctor.rating}
                  starSize={20}
                  fullStarColor="#F5C664"
                  containerStyle={styles.stars}
                />
              </View>
              <View style={styles.chipContainer}>
                <Chip icon="map-marker">{doctor.location}</Chip>
                <Chip icon="clock-time-four-outline">{`${doctor.distance} miles`}</Chip>
              </View>
            </View>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={handleExpandButtonPress}
            >
              <Text style={{ color: '#306B70' }}>
                {isDescriptionExpanded ? 'Collapse' : 'Expand'}
              </Text>
            </TouchableOpacity>
          </View>
          {isDescriptionExpanded && <Text style={styles.description}>{doctor.description}</Text>}
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
          style={styles.searchBar}
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
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAE0A4',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  doctorImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    paddingTop: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  stars: {
    alignSelf: 'flex-end',
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#EB5F56',
  },
  expandButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 8,
    borderTopLeftRadius: 8,
  },
  description: {
    marginTop: 16,
  },
  reviewContainer: {
    marginTop: 16,
  },
  addButton: {
    backgroundColor: '#306B70',
    marginTop: 8,
  },
  searchBar: {
    backgroundColor: 'rgba(148,206,210,0.30)',
    marginTop: 8,
  },
  reviewCard: {
    marginTop: 8,
  },
  reviewInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 8,
  },
  reviewDetails: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
  },
});

export default DoctorDetailScreen;
