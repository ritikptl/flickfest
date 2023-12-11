import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MovieDetails = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = 'e1835717';
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);

        if (response.data && response.data.Response === 'True') {
          setMovieDetails(response.data);
        } else {
          setMovieDetails(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {movieDetails ? (
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{movieDetails.Title}</Text>
          <Text>Year: {movieDetails.Year}</Text>
          <Text>Rated: {movieDetails.Rated}</Text>
          <Text>Runtime: {movieDetails.Runtime}</Text>
          <Text>Genre: {movieDetails.Genre}</Text>
          <Text>Director: {movieDetails.Director}</Text>
          <Text>Plot: {movieDetails.Plot}</Text>
          {/* Add more details as needed */}
        </View>
      ) : (
        <Text>No movie details found.</Text>
      )}
    </View>
  );
};

export default MovieDetails;
