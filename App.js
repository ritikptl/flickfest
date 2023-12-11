import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RandomMovie from './components/RandomMovies';
import FavoritesList from './components/FavoriteMovies'; 
import MovieQuiz from './components/MovieQuiz';
import SearchResultScreen from './components/SearchResultScreen';
import store from './store';

import { Provider } from 'react-redux';
import MovieDetails from './components/MovieDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RandomMovies" component={RandomMovie} />
          <Stack.Screen name="FavoritesList" component={FavoritesList} />
          <Stack.Screen name ="SearchResult" component={SearchResultScreen} />
          <Stack.Screen name ="MovieDetails" component={MovieDetails} />
          <Stack.Screen name ="MovieQuiz" component={MovieQuiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
