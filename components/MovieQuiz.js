import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const MovieQuiz = () => {
    const [movieQuestion, setMovieQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [hint, setHint] = useState('');
  
    useEffect(() => {
      fetchMovieQuestion();
    }, []);
  
    const fetchMovieQuestion = async () => {
        try {
          const apiKey = 'e1835717';
          const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=movie&page=1`);
      
          if (response.data && response.data.Search && response.data.Search.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.Search.length);
            const randomMovie = response.data.Search[randomIndex];
            const movieDetails = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${randomMovie.imdbID}`);
      
            const questionTypes = ['Runtime', 'Director', 'Year', 'Genre']; 
            const randomQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            let question = '';
            let correctAnswer = '';
            let options = [];
      
            switch (randomQuestionType) {
              case 'Runtime':
                question = `What is the runtime of the movie "${movieDetails.data.Title}"?`;
                correctAnswer = movieDetails.data.Runtime;
                options = [
                  movieDetails.data.Runtime,
                  '90 min',
                  '120 min',
                  '150 min'
                ];
                break;
              case 'Director':
                question = `Who directed the movie "${movieDetails.data.Title}"?`;
                correctAnswer = movieDetails.data.Director;
                options = [
                  movieDetails.data.Director,
                  'Christopher Nolan',
                  'Quentin Tarantino',
                  'Martin Scorsese'
                ];
                break;
              case 'Year':
                question = `In which year was the movie "${movieDetails.data.Title}" released?`;
                correctAnswer = movieDetails.data.Year;
                options = [
                  movieDetails.data.Year,
                  '1983',
                  '2015',
                  '2003'
                ];
                break;
              case 'Genre':
                question = `What genre does the movie "${movieDetails.data.Title}" belong to?`;
                correctAnswer = movieDetails.data.Genre;
                options = [
                  movieDetails.data.Genre,
                  'Horror',
                  'Comedy',
                  'Action'
                ];
                break;
              default:
                break;
            }
      
            setMovieQuestion(question);
            setCorrectAnswer(correctAnswer);
            setOptions(shuffleArray(options));
            setHint(`Hint: The movie's plot is - ${movieDetails.data.Plot}`);
          }
        } catch (error) {
          console.error('Error fetching movie question:', error);
        }
      };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionSelect = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      alert('Correct answer!');
    } else {
      alert('Incorrect answer! Try again.');
    }
  };

  const resetQuiz = () => {
    fetchMovieQuestion(); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.questionText}>{movieQuestion}</Text>
      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionSelect(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Hint" onPress={() => alert(hint)} />
      <Button title="Replay Quiz" onPress={resetQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
});

export default MovieQuiz;
