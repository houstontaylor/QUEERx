import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Modal,
  Portal,
  Button,
  TextInput,
  RadioButton,
  Title,
  Checkbox,
} from 'react-native-paper';

const FilterModal = ({ visible, hideModal, applyFilters }) => {
  const [distance, setDistance] = useState('');
  const [insurance, setInsurance] = useState('');
  const [gender, setGender] = useState('');
  const [starRating, setStarRating] = useState('');

  const handleApplyFilters = () => {
    // Pass the selected filters to the parent component
    applyFilters({ distance, insurance, gender, starRating });

    // Close the modal
    hideModal();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <ScrollView style={styles.container}>
          <Title>Filter Doctors</Title>
          {/* Distance */}
          <TextInput
            label="Distance (in miles)"
            value={distance}
            onChangeText={(text) => setDistance(text)}
          />

          {/* Insurance */}
          <TextInput
            label="Insurance"
            value={insurance}
            onChangeText={(text) => setInsurance(text)}
          />

          {/* Gender */}
          <Title>Gender</Title>
          <RadioButton.Group
            onValueChange={(value) => setGender(value)}
            value={gender}
          >
            <View style={styles.radioContainer}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
              <RadioButton.Item label="Other" value="other" />
            </View>
          </RadioButton.Group>

          {/* Star Rating */}
          <Title>Star Rating</Title>
          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              label="4 stars and above"
              status={starRating === '4' ? 'checked' : 'unchecked'}
              onPress={() => setStarRating('4')}
            />
            <Checkbox.Item
              label="3.5 stars and above"
              status={starRating === '3.5' ? 'checked' : 'unchecked'}
              onPress={() => setStarRating('3.5')}
            />
            <Checkbox.Item
              label="3 stars and above"
              status={starRating === '3' ? 'checked' : 'unchecked'}
              onPress={() => setStarRating('3')}
            />
          </View>

          {/* Apply Button */}
          <Button mode="contained" onPress={handleApplyFilters}>
            Apply Filters
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    marginTop: 8,
  },
});

export default FilterModal;
