import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { setRandomMovie, addToFavorites } from '../Slices/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { activateKeepAwakeAsync, deactivateKeepAwakeAsync } from 'expo-keep-awake';

const RandomMovie = () => {
  const dispatch = useDispatch();
  const randomMovie = useSelector((state) => state.movie.randomMovie);
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    try {
      const randomId = Math.floor(Math.random() * 999999) + 1;
      const imdbId = `tt${String(randomId).padStart(7, '0')}`;

      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=b334b09a`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      dispatch(setRandomMovie(data));
    } catch (error) {
      console.error('API Error:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    const activateKeepAwake = async () => {
      try {
        await activateKeepAwakeAsync();
        console.log('Keep awake activated successfully');
      } catch (error) {
        console.error('Error activating keep awake:', error);
      }
    };

    activateKeepAwake();

    fetchData();

    return () => {
      const deactivateKeepAwake = async () => {
        try {
          await deactivateKeepAwakeAsync();
          console.log('Keep awake deactivated successfully');
        } catch (error) {
          console.error('Error deactivating keep awake:', error);
        }
      };

      deactivateKeepAwake();
    };
  }, [fetchData]);

  const handleFetchNewData = () => {
    fetchData();
  };

  const handleAddToFavorites = () => {
    if (randomMovie) {
      dispatch(addToFavorites(randomMovie));
    }
  };

  const handleGoToFavorites = () => {
    navigation.navigate('FavoritesList');
  };

  if (!randomMovie || Object.keys(randomMovie).length === 0) {
    return <Text>Loading...</Text>;
  }

   const data = [
    { label: 'Title', value: randomMovie.Title },
    { label: 'Poster', value: randomMovie.Poster },
    { label: 'Year', value: randomMovie.Year },
    { label: 'Rated', value: randomMovie.Rated },
    { label: 'Released', value: randomMovie.Released },
    { label: 'Genre', value: randomMovie.Genre },
    { label: 'Director', value: randomMovie.Director },
    { label: 'Writer', value: randomMovie.Writer },
    { label: 'Actors', value: randomMovie.Actors },
    { label: 'Plot', value: randomMovie.Plot },
    
  ];

  const renderItem = ({ item }) => (
    <View>
      {item.label === 'Poster' ? (
        <Image
          source={{ uri: item.value }}
          style={{ width: 350, height: 200, marginVertical: 10 }}
        />
      ) : (
        <Text>{item.label}: {item.value}</Text>
      )}
    </View>
  );

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity onPress={handleFetchNewData}>
        <View style={{ backgroundColor: 'blue', padding: 10, marginVertical: 10 }}>
          <Text style={{ color: 'white' }}>RandomMovie</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddToFavorites}>
        <View style={{ backgroundColor: 'green', padding: 10, marginVertical: 10 }}>
          <Text style={{ color: 'white' }}>Add to Favorites</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToFavorites}>
        <View style={{ backgroundColor: 'purple', padding: 10, marginVertical: 10 }}>
          <Text style={{ color: 'white' }}>Go to Favorites</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SearchResult')}>
        <View style={{ backgroundColor: 'red', padding: 10, marginVertical: 10 }}>
          <Text style={styles.buttonText}>Search Movies</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MovieQuiz')}>
        <View style={{ backgroundColor: 'orange', padding: 10, marginVertical: 10 }}>
          <Text style={styles.buttonText}>Movie Quiz</Text>
        </View>
      </TouchableOpacity>


    </View>
  );
};

export default RandomMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});