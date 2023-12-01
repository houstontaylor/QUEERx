import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, 
  Searchbar, 
  List, 
  Title,
  Button,
  Card,
  Text,
  Modal,
  Portal,
  Checkbox,
  IconButton } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();

const SearchResultsScreen = ({ route }) => {
  const { initialSearchQuery, location } = route.params;
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

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
        nb: false,
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

  // Placeholder data for search results
  const searchResults = [
    {
      id: 1,
      title: 'Dr. Jayakar',
      location: 'Sunnyvale, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor1.png'),
      filters:['distance', 'mi10', 'gender', 'woman', 'ratng', 'star4', 'star35', 'star3'],
      rating: 4
    },
    {
      id: 2,
      title: 'Dr. Qureshi',
      location: 'San Francisco, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor2.png'),
      filters:['distance', 'mi25', 'gender', 'woman', 'ratng', 'star3'],
      rating: 3
    },
    {
      id: 3,
      title: 'Dr. Posada',
      location: 'Redwood City, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor3.png'),
      filters:['distance', 'mi10', 'gender', 'man', 'ratng', 'star4', 'star35', 'star3'],
      rating: 4
    },
    {
      id: 4,
      title: 'Dr. Kaur',
      location: 'Palo Alto, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor4.png'),
      filters:['distance', 'mi5', 'gender', 'woman'],
      rating: 2
    },
    {
      id: 5,
      title: 'Dr. Suri',
      location: 'Cupertino, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor5.png'),
      filters:['distance', 'mi25', 'gender', 'man'],
      rating: 1
    },
    {
      id: 6,
      title: 'Dr. Singh',
      location: 'Mountain View, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor6.png'),
      filters:['distance', 'mi10', 'gender', 'woman'],
      rating: 1
    },
    {
      id: 7,
      title: 'Dr. Rajput',
      location: 'Hayward, CA',
      description: 'Primary Care Physician, MD',
      image: require('./assets/doctor7.png'),
      filters:['distance', 'mi50', 'gender', 'woman', 'ratng', 'star4', 'star35', 'star3'],
      rating: 4
    },
  ];

  const filteredResults = searchResults.filter((result) =>
    Object.keys(filters).every((filter) => {
      if (typeof filters[filter] === 'object' && filters[filter].options) {
        return Object.keys(filters[filter].options).every(
          (option) => !filters[filter].options[option] || result.filters.includes(option)
        );
      } else {
        return !filters[filter] || result.filters.includes(filter);
      }
    })
  );

  const handleSearch = () => {
    // Navigate to the Search Results screen with searchQuery and location as parameters
    navigation.navigate("Results", { searchQuery, location });
  };

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

  const numResults = filteredResults.length;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#FAE0A4' }}>
      <View style={{ display: 'inline-block',  }}>
        <Searchbar
          placeholder={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
        />
        <IconButton
          icon={({ color, size }) => <MaterialCommunityIcons name="filter" color={color} size={size} />}
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
          contentContainerStyle={{ backgroundColor: '#F5F5F5', padding: 16 }}
        >
          <View style={{ padding: 16 }}>
          <Title>Filters</Title>
          <ScrollView>
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
          </ScrollView>
          </View>
        </Modal>
      </Portal>
      <Title>
        {numResults > 0
          ? `${numResults} result${numResults !== 1 ? 's' : ''} near ${location.length == 0 ? 'you' : location}`
          : `No results found for "${searchQuery}" near ${location}`}
      </Title>
      <ScrollView>
        <List.Section>
        {filteredResults.map((result) => (
          <Card key={result.id} style={styles.card}>
            <Card.Cover source={result.image} style={styles.doctorimage} />
            <View style={styles.starsContainer}>
              <StarRating disabled maxStars={5} rating={result.rating} starSize={20} fullStarColor='#F5C664' containerStyle={styles.stars} />
            </View>
            <View style={styles.textContainer}>
              <Card.Title title={result.title} subtitle={`${result.location}`} />
              <Card.Content>
                <Text>{result.description}</Text>
              </Card.Content>
            </View>
          </Card>
        ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Navigate to the Search Results screen with searchQuery and location as parameters
    navigation.navigate("Results", { searchQuery, location });
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.image} />
      <Searchbar
        placeholder="Search doctor by name or specialty"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
      />
      <Searchbar
        placeholder="Current location"
        onChangeText={(text) => setLocation(text)}
        value={location}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
        icon="map-marker"
      />
      <Button mode="contained" onPress={handleSearch} style={styles.button}>
        Search
      </Button>
      <Image source={require('./assets/doctors.png')} style={styles.image} />
    </View>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Results" component={SearchResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#306B70',

  },
  image: {
    width: '90%',
  },
  resultContainer: {
    marginBottom: 16,
  },
  doctorimage: {
    width: 70, // Adjust the size as needed
    height: 70, // Adjust the size as needed
    resizeMode: 'cover',
    position: 'absolute',
    top: 25,
    left: 10,
    borderRadius: 8,
  },
  searchBar: {
    marginBottom: 16,
    backgroundColor: 'rgba(148,206,210,0.30)',
    width: '90%',
  },
  card: {
    marginBottom: 16,
    height: '14%'
  },
  textContainer: {
    marginLeft: 80, // Adjust the margin to create space for the image
  },
  stars: {
    marginRight: 8,
  },
  starsContainer: {
    top: 25,
    right: 5,
    flexDirection: 'row-reverse', // Right-align the stars
    alignItems: 'center',
  }
});