// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import DoctorDetailScreen from './screens/DoctorDetailScreen';
import ReviewScreen from './screens/ReviewScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="DoctorDetail" component={DoctorDetailScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
