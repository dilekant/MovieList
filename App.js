import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {NotifierWrapper} from 'react-native-notifier/src/NotifierWrapper';
import {PersistGate} from "redux-persist/integration/react";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NotifierWrapper>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTitleAlign: 'center',
                        headerTintColor: '#ffffff',
                    }}>
                    <Stack.Screen
                        name="MovieList"
                        component={MovieListScreen}
                        options={{
                            title: 'Movie List',
                            headerStyle: {
                                backgroundColor: 'red',
                            },
                        }}
                    />
                    <Stack.Screen
                        name="MovieDetail"
                        component={MovieDetailScreen}
                        options={{
                            title: null,
                            headerShadowVisible: false,
                            headerBackTitleVisible: false,
                        }}
                    />
                    <Stack.Screen
                        name="Favorites"
                        component={FavoritesScreen}
                        options={{
                            headerBackTitleVisible: false,
                            headerStyle: {
                                backgroundColor: 'red',
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PersistGate>
      </Provider>
    </NotifierWrapper>
  );
}

export default App;
