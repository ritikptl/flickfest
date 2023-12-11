import React from 'react';
import { View, Text, FlatList,Image } from 'react-native';
import { useSelector } from 'react-redux';

const FavoritesList = () => {
  const favoriteMovies = useSelector((state) => state.movie.favoriteMovies);

  const renderItem = ({ item }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
    <Text>Title: {item.Title}</Text>
    <Image
      source={{ uri: item.Poster }}
      style={{ width: 350, height: 200, marginVertical: 10 }}
    />
    <Text>Year: {item.Year}</Text>
    <Text>Rated: {item.Rated}</Text>
    <Text>Released: {item.Released}</Text>
    <Text>Genre: {item.Genre}</Text>
    <Text>Director: {item.Director}</Text>
    <Text>Writer: {item.Writer}</Text>
    <Text>Actors: {item.Actors}</Text>
    <Text>Plot: {item.Plot}</Text>
    
  </View>
);

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Favorites List
      </Text>
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.imdbID}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

export default FavoritesList;
