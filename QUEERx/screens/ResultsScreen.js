// ResultsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultsScreen = ({ route }) => {
  const { searchQuery } = route.params;

  return (
    <View style={styles.container}>
      <Text>Results for: {searchQuery}</Text>
      {/* Display the list of doctors here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default ResultsScreen;
