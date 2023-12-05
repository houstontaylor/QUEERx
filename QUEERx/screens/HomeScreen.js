// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function HomeScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    // Perform the search or navigation to the ResultsScreen with the search and location data
    navigation.navigate('Results', { searchTerm, location });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Find a Doctor</Text>
      
      <TextInput
        placeholder="Search for a doctor or specialty"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{ marginTop: 10, marginBottom: 10, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
      />

      <TextInput
        placeholder="Enter your location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={{ marginBottom: 10, padding: 8, borderWidth: 1, borderColor: '#ccc' }}
      />

      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

export default HomeScreen;
