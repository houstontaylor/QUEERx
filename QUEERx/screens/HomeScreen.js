// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Navigate to the Search Results screen with searchQuery and location as parameters
    navigation.navigate("Results", { searchQuery, location });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
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
      <Image source={require('../assets/doctors.png')} style={styles.image} />
    </View>
  );
}

export default HomeScreen;

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
    width: '100%',
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
