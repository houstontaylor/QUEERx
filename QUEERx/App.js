import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/Home.js';
import ResultsScreen from './screens/ResultsScreen.js';
import DoctorDetailScreen from './screens/DoctorDetailScreen.js';
import AddReviewScreen from './screens/AddReviewScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Detail" component={DoctorDetailScreen} />
          <Stack.Screen name="Review" component={AddReviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
