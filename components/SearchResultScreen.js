import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchResultScreen = ({ navigation }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchMovie = async (text) => {
    try {
      const apiKey = 'e1835717';
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${text}&type=movie`);

      if (response.data && response.data.Response === 'True') {
        setSearchResults(response.data.Search || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for movie:', error);
    }
  };

  const handleSearch = () => {
    if (movieTitle.trim() !== '') {
      searchMovie(movieTitle);
    } else {
      setSearchResults([]);
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem} onPress={() => navigation.navigate('MovieDetails', { movieId: item.imdbID })}>
      <Text>{item.Title} - {item.Year}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setMovieTitle(text)}
        value={movieTitle}
        placeholder="Enter movie title"
      />
      <Button title="Search" onPress={handleSearch} />
      
      <FlatList
        data={searchResults}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.imdbID}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  flatList: {
    width: '100%',
  },
});

export default SearchResultScreen;
