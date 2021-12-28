import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTintColor: '#ffffff'}}>
          <Stack.Screen name="MovieList" component={MovieListScreen} options={{title: 'Movie List', headerStyle: {backgroundColor: 'red'} }} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{title: null}} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{headerStyle: {backgroundColor: 'red'}}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
