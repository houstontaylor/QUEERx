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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  // Fetch doctors based on searchQuery
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDoctors(searchQuery);
        setDoctors(result);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
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
  const labels = ['< 5 miles', '< 10 miles', '< 25 miles', '< 50 miles', '< 100 miles', 'woman', 'man', 'nonbinary/other', '> 4 stars', '> 3.5 stars', '> 3 stars'];

  return (
    <View style={styles.container}>
      <View style={{ display: 'inline-block' }}>
        <Searchbar
          placeholder={searchQuery}
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
          style={{ marginTop: 8 }}
        />
      </View>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: '#F5F5F5',
            padding: 16,
            height: '70%',
          }}
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
                          label={option}
                          status={filters[filter].options[option] ? 'checked' : 'unchecked'}
                          onPress={() => toggleFilter(filter, option)}
                        />
                      ))
                    : (
                      <Checkbox.Item
                        label={filter}
                        status={filters[filter] ? 'checked' : 'unchecked'}
                        onPress={() => toggleFilter(filter)}
                      />
                    )}
                </View>
              ))}
              <Button onPress={hideModal}>Apply</Button>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      <ScrollView>
        <Title>
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
              style={{ margin: 16 }}
              onPress={() => handleDoctorPress(item)}
            >
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
              <View style={styles.textContainer}>
                <Card.Title title={item.title} subtitle={`${item.location}`} />
                <Card.Content>
                  <Text>{item.description}</Text>
                </Card.Content>
              </View>
            </Card>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAE0A4',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#306B70',
  },
  image: {
    width: '90%',
  }
});

