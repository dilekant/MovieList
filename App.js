import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import {Provider} from "react-redux";
import configureStore from "./src/reducers/configureStore";

const Stack = createNativeStackNavigator();
const store = configureStore();

function App() {
  return (
      <Provider store={store}>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTintColor: '#ffffff'}}>
                  <Stack.Screen name="MovieList" component={MovieListScreen} options={{title: 'Movie List', headerStyle: {backgroundColor: 'red'} }} />
                  <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{title: null, headerShadowVisible: false}} />
                  <Stack.Screen name="Favorites" component={FavoritesScreen} options={{headerStyle: {backgroundColor: 'red'}}} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}

export default App;
