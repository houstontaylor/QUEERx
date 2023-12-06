// ResultsScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import {
  Searchbar,
  List,
  Title,
  Button,
  Card,
  Text,
  Modal,
  Portal,
  Checkbox,
  IconButton,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { doctorsData } from '../constants';
import { fetchDoctors } from '../api';
import FilterModal from '../components/FilterModal';

const ResultsScreen = ({ route, navigation }) => {
  const { initialSearchQuery, location } = route.params;
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [doctors, setDoctors] = useState(doctorsData);
  const [filters, setFilters] = useState({
    distance: {
      title: 'Distance',
      options: {
        mi5: false,
        mi10: false,
        mi25: false,
        mi50: false,
        mi100: false,
      },
    },
    gender: {
      title: 'Gender',
      options: {
        woman: false,
        man: false,
        nonbinary: false,
      },
    },
    rating: {
      title: 'Rating',
      options: {
        star4: false,
        star35: false,
        star3: false,
      },
    },
  });
  const optionLabels = {
    mi5: '< 5 miles',
    mi10: '< 10 miles',
    mi25: '< 25 miles',
    mi50: '< 50 miles',
    mi100: '< 100 miles',
    woman: 'Woman',
    man: 'Man',
    nonbinary: 'Nonbinary/Other',
    star4: '> 4 stars',
    star35: '> 3.5 stars',
    star3: '> 3 stars',
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  // Fetch doctors based on searchQuery
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const result = await fetchDoctors(searchQuery);
    //     setDoctors(result);
    //   } catch (error) {
    //     console.error('Error fetching doctors:', error);
    //   }
    // };

    // fetchData();
  }, [searchQuery, filters]);

  const toggleFilter = (filter, option) => {
    if (option) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filter]: {
          ...prevFilters[filter],
          options: {
            ...prevFilters[filter].options,
            [option]: !prevFilters[filter].options[option],
          },
        },
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filter]: !prevFilters[filter],
      }));
    }
  };

  const handleDoctorPress = (doctor) => {
    navigation.navigate('Detail', { doctor });
  };

  const handleSearch = () => {
    // Navigate to the Search Results screen with searchQuery and location as parameters
    navigation.navigate('Results', { searchQuery, location });
  };

  const numResults = doctors.length;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={initialSearchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
        />
        <IconButton
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="filter" color={color} size={size} />
          )}
          onPress={showModal}
          color="#306B70" // Customize the color as needed
          size={20} // Customize the size as needed
          style={styles.icon}
        />
      </View>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <ScrollView>
            <View style={{ padding: 16 }}>
              <Title>Filters</Title>
              {Object.keys(filters).map((filter) => (
                <View key={filter}>
                  <Title>{filters[filter].title}</Title>
                  {typeof filters[filter] === 'object' && filters[filter].options
                    ? Object.keys(filters[filter].options).map((option) => (
                        <Checkbox.Item
                          key={option}
                          label={optionLabels[option]}
                          status={filters[filter].options[option] ? 'checked' : 'unchecked'}
                          onPress={() => toggleFilter(filter, option)}
                        />
                      ))
                    : (
                      <Checkbox.Item
                        label={optionLabels[filter]}
                        status={filters[filter] ? 'checked' : 'unchecked'}
                        onPress={() => toggleFilter(filter)}
                      />
                    )}
                </View>
              ))}
            </View>
          </ScrollView>
          <Button onPress={hideModal}>Apply</Button>
        </Modal>
      </Portal>
      <View style={styles.cardsContainer}>
        <Title style={styles.title}>
          {numResults > 0
            ? `${numResults} result${numResults !== 1 ? 's' : ''} near ${
                location.length == 0 ? 'you' : location
              }`
            : `No results found for "${searchQuery}" near ${location}`}
        </Title>
        <FlatList
          data={doctors}
          keyExtractor={(result) => result.id.toString()}
          renderItem={({ item }) => (
            <Card
              key={item.id}
              style={styles.card}
              onPress={() => handleDoctorPress(item)}
            >
              <Card.Content>
                <View style={styles.imageContainer}>
                  <Card.Cover source={item.image} style={styles.doctorimage} />
                  <View style={styles.starsContainer}>
                    <StarRating
                      disabled
                      maxStars={5}
                      rating={item.rating}
                      starSize={20}
                      fullStarColor="#F5C664"
                      containerStyle={styles.stars}
                    />
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Card.Title title={item.title} subtitle={`${item.location}`} />
                  <Card.Content>
                    <Text>{item.description}</Text>
                  </Card.Content>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'right',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAE0A4',
    width: '100%'
  },
  button: {
    marginTop: 16,
    backgroundColor: '#306B70',
  },
  image: {
    width: '90%',
  },
  searchBar: {
    backgroundColor: 'rgba(148,206,210,0.30)',
    width: '80%',
  },
  icon: {
    width: '20%',
    marginTop: 8, 
    backgroundColor: '#306B70',
    height: "90%"
  },
  searchContainer: {
    flexDirection: 'row', // Set the direction to row
    alignItems: 'center', // Center items vertically
    width: '100%', // Ensure the container takes up the full width
  },
  modal: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    height: '70%',
  },
  title: {
    alignContent:'flex-start'
  },
  cardsContainer: {
    width: '100%',
    marginTop: 16,
  },
  card: {
    width: '100%',
    marginBottom: 16,
  },
  doctorimage: {
    width: '40%', // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
});

