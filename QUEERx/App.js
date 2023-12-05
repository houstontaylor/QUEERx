import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import ResultsScreen from './screens/ResultsScreen';
import DoctorDetailScreen from './screens/DoctorDetailScreen';
import AddReviewScreen from './screens/AddReviewScreen';

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
