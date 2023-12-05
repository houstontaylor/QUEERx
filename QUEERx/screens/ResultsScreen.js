// screens/ResultsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const dummyDoctorData = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', distance: '2 miles' },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', distance: '5 miles' },
  // Add more dummy data or fetch real data from an API
];

function ResultsScreen({ route, navigation }) {
  const { searchTerm, location } = route.params;
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch or filter doctors based on searchTerm and location
    // Replace the following line with your actual data fetching logic
    const filteredDoctors = dummyDoctorData.filter(
      (doctor) =>
        doctor.name == undefined ? doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) : '' &&
        doctor.distance == undefined ? doctor.distance.toLowerCase().includes(location.toLowerCase()): ''
    );

    setDoctors(filteredDoctors);
  }, [searchTerm, location]);

  const handleDoctorPress = (doctor) => {
    // Navigate to the DoctorDetailScreen with the selected doctor's data
    navigation.navigate('DoctorDetail', { doctor, navigation });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Search Results</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDoctorPress(item)}>
            <View style={{ padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc' }}>
              <Text>{item.name}</Text>
              <Text>{item.specialty}</Text>
              <Text>{item.distance}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ResultsScreen;
