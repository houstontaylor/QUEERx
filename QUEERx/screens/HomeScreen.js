// HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSubmitSearch = () => {
    // Navigate to the ResultsScreen with searchQuery
    navigation.navigate('Results', { searchQuery });
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for doctors"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={onSubmitSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default HomeScreen;
