import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/Home.js';
import ResultsScreen from './screens/ResultsScreen.js';
import DoctorDetailScreen from './screens/DoctorDetailScreen.js';
import AddReviewScreen from './screens/AddReviewScreen.js';
import ReviewDetailScreen from './screens/ReviewDetailScreen.js';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

const Header = {
  headerTitle: () => (
    <Image
      source={require('./assets/logo.png')}
      style={{ width: 150, height: 50, resizeMode: 'contain' }}
    />
  ),
  headerTitleAlign: 'center',
};

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FAE0A4',
          height:60,
        },
        headerTintColor: '#306B70',
        headerBackTitle: 'Back', // Set a default back button title
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ 
          title: 'Home' ,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={Header}
      />
      <Stack.Screen
        name="Doctor Details"
        component={DoctorDetailScreen}
        options={Header}
      />
      <Stack.Screen
        name="Review"
        component={AddReviewScreen}
        options={Header}
      />
      <Stack.Screen
        name="Review Detail"
        component={ReviewDetailScreen}
        options={Header}
      />
    </Stack.Navigator>
  );
};

export default function App() {


  return (
    <PaperProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  );
}
