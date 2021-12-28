import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import FavoritesScreen from './src/screens/Favorites';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen name="MovieList" component={MovieListScreen} options={{title: 'Movie List'}} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{title: 'Movie Detail'}} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
