import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, 
  Searchbar, 
  List, 
  Title,
  Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const SearchResultsScreen = ({ route }) => {
  const [searchQuery, setSearchQuery] = route.params.searchQuery;
  const [location, setLocation] = route.params.location;

  // Placeholder data for search results
  const searchResults = [
    {
      id: 1,
      title: 'Result 1',
      location: 'Location A',
      description: 'Description for Result 1. Add more details here.',
      image: require('./path/to/image1.jpg'),
    },
    {
      id: 2,
      title: 'Result 2',
      location: 'Location B',
      description: 'Description for Result 2. Add more details here.',
      image: require('./path/to/image2.jpg'),
    },
    {
      id: 3,
      title: 'Result 3',
      location: 'Location C',
      description: 'Description for Result 3. Add more details here.',
      image: require('./path/to/image3.jpg'),
    },
  ];

  const handleSearch = () => {
    // Navigate to the Search Results screen with searchQuery and location as parameters
    navigation.navigate("Results", { searchQuery, location });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Searchbar
        placeholder={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.button}
      />
      <Title>
        {searchResults.size} results for near {location}
      </Title>
      <List.Section>
        {searchResults.map((result) => (
          <List.Item
            key={result.id}
            title={result.title}
            description={`Location: ${result.location}`}
            onPress={() => console.log(`Selected: ${result.title}`)}
          />
        ))}
      </List.Section>
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
    <View style={{ flex: 1, padding: 16 }}>
      <Image source={require('./assets/logo.png')} style={styles.image} />
      <Searchbar
        placeholder="Search doctor by name or specialty"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.button}
      />
      <Searchbar
        placeholder="Current location"
        onChangeText={(text) => setLocation(text)}
        value={location}
        onSubmitEditing={handleSearch}
        style={styles.button}
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
  },
  image: {
    width: '90%',
  }
});