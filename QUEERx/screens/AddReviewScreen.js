import React, { useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Avatar, Title, Text, Portal, Modal } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import * as ImagePicker from 'expo-image-picker';

const AddReviewScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [identities, setIdentities] = useState('');
  const [rating, setRating] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [review, setReview] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.uri);
    }
  };

  const handleReviewSubmit = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    // Navigate back to the doctor screen
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Title style={styles.title}>Add Review</Title>

        <View style={styles.rowContainer}>
          <View style={styles.imagePickerContainer}>
            <Avatar.Image
              source={avatar ? { uri: avatar } : require('../assets/empty-avatar.png')}
              size={100}
              style={styles.avatar}
            />
            <Button mode="contained" onPress={pickImage} style={styles.uploadButton}>
              Upload Image
            </Button>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              label="Anonymous"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(rating) => setRating(rating)}
              fullStarColor="#F5C664"
              containerStyle={styles.starRatingContainer}
            />
          </View>
        </View>

        <TextInput
          label="Personal Identities"
          value={identities}
          onChangeText={setIdentities}
          style={styles.input}
        />

        <TextInput
          label="Write your review..."
          multiline
          value={review}
          onChangeText={setReview}
          style={[styles.input, { height: 100 }]}
        />

        <Button mode="contained" onPress={handleReviewSubmit} style={styles.submitButton}>
          Submit Review
        </Button>

        {/* Confirmation Modal */}
        <Portal>
          <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalText}>Review submitted successfully!</Text>
            <Button mode="contained" onPress={hideModal} style={styles.submitButton}>
              OK
            </Button>
          </Modal>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAE0A4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 8,
    backgroundColor: '#306B70',
  },
  uploadButton: {
    marginTop: 8,
    backgroundColor: '#306B70'
  },
  inputContainer: {
    flex: 1,
    marginLeft: 16,
  },
  input: {
    marginBottom: 16,
  },
  starRatingContainer: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#306B70',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AddReviewScreen;
