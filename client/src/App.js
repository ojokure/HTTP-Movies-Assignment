import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import axios from "axios";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const [movies, setMovies] = useState([]);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const deleteMovie = id => e => {
    axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovies(movies.filter(movie => movie.id !== id))
        })
        .catch(err => console.log(err.response));
}

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => {
          return <MovieList {...props} movies={movies} setMovies={setMovies} />;
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie}/>;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} movies={movies} setMovies={setMovies}/>;
        }}
      />
    </>
  );
};

export default App;
