import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Linking, Image } from 'react-native';
import {
  Avatar,
  Card,
  Text,
  Title,
  Subheading,
  Chip,
  Searchbar,
  Button,
  IconButton,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DoctorDetailScreen = ({ route, navigation }) => {
  const { doctor } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const reviews = doctor.reviews;

  let filteredReviews = reviews;
  if (searchQuery !== '') {
    filteredReviews = reviews.filter((review) =>
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleAddReview = () => {
    navigation.navigate('Review', { doctor });
  };

  const handleReviewPress = (reviewer) => {
    // Navigate to ReviewDetailScreen with the selected reviewer's information
    navigation.navigate("Review Detail", { reviewer });
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleExpandButtonPress = () => {
    toggleDescription();
  };

  const handleCallDoctor = () => {
    // Use Linking to initiate a phone call
    const phoneNumber = doctor.phone;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleOpenDirections = () => {
    // Create a deep link for directions using the doctor's address
    const address = encodeURIComponent(`${doctor.address}, ${doctor.location}`);
    Linking.openURL(`http://maps.apple.com/?daddr=${address}`);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.avatarContainer}>
              <Avatar.Image source={doctor.image} size={80} />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.textContainer}>
                <Title>{doctor.title}</Title>
                <Subheading>{doctor.profession}</Subheading>
              </View>
              <View style={[styles.starsContainer, { padding: 2 }]}>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={doctor.rating}
                  starSize={20}
                  fullStarColor="#F5C664"
                  containerStyle={styles.stars}
                />
              </View>
            </View>
          </View>
          <View style={styles.chipContainer}>
            <Chip icon={() => <MaterialCommunityIcons name="map-marker" size={15} color="#FAF9F6"/>} style={[styles.chip, { marginRight: 8 }]}>
              <Text style={{ color:"#FFF" }}>{doctor.location}</Text>
            </Chip>
            <Chip icon={() => <MaterialCommunityIcons name="clock-time-four-outline" size={15} color="#FAF9F6"/>} style={styles.chip}>
              <Text style={{ color:"#FFF" }}>{`${doctor.distance} miles`}</Text>
            </Chip>
          </View>
          <IconButton
            icon={isDescriptionExpanded ? 'chevron-up' : 'chevron-down'}
            color="#EB5F56"
            size={24}
            onPress={handleExpandButtonPress}
            style={{ color: '#306B70', marginLeft: 'auto' }}
          />
          {isDescriptionExpanded && (
            <View>
              <Text style={styles.description}>{doctor.description}</Text>
              <View style={styles.contactContainer}>
                <IconButton
                  icon={() => <MaterialCommunityIcons name="phone" size={20} color="#306B70" />}
                  color="#306B70"
                  onPress={handleCallDoctor}
                />
                <TouchableOpacity onPress={handleCallDoctor}>
                  <Text style={{ marginLeft: 8 }}>{doctor.phone}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contactContainer}>
                <IconButton
                  icon={() => <MaterialCommunityIcons name="map-marker" size={20} color="#306B70" />}
                  color="#306B70"
                  onPress={handleOpenDirections}
                />
                <TouchableOpacity onPress={handleOpenDirections}>
                  <Text style={{ marginLeft: 8 }}>{doctor.address}</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          )}
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
            <TouchableOpacity onPress={() => handleReviewPress(item)}>
              <Card style={styles.reviewCard}>
                <Card.Content>
                  <View style={styles.reviewInfoContainer}>
                    <Avatar.Image source={item.image} size={40} style={styles.avatar} />
                    <View style={styles.reviewDetails}>
                      <Text style={styles.reviewName}>{item.name}</Text>
                      <View style={styles.starsContainer}>
                        <StarRating
                          disabled
                          maxStars={5}
                          rating={item.rating}
                          starSize={15}
                          fullStarColor="#F5C664"
                          containerStyle={styles.smallStars}
                        />
                      </View>
                      <Text style={styles.reviewComment}>
                        {item.comment.length > 40 ? `${item.comment.substring(0, 20)}...` : item.comment}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
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
  },
  contentContainer: {
    paddingTop: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  stars: {
    alignSelf: 'flex-end',
    width: '65%',
  },
  chipContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 8,
    flexWrap: 'wrap',
    width: '100%'
  },
  chip: {
    backgroundColor: '#EB5F56',
  },
  expandButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
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
    position: 'absolute',
    right: 8,
    top: -10
  },
  searchBar: {
    backgroundColor: '#94ced24d',
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
  textContainer: {
    marginLeft: 8,
  },
  callButton: {
    backgroundColor: '#306B70',
    marginTop: 8,
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  smallStars: {
    alignSelf: 'flex-end',
    width: '50%',
  },
});

export default DoctorDetailScreen;
