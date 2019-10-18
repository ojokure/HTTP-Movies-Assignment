import React, { Component } from "react";
import axios from "axios";
import {  Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  // constructor(props) {
    // super(props);
  //   this.state = {
  //     movies: []
  //   };
  // }

  componentDidMount() {
    axios.get("http://localhost:5000/api/movies")
      .then(res => this.props.setMovies(res.data ))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div>
        <div className="movie-list">
          {this.props.movies.map(movie => (
            <MovieDetails key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <div>
      <Link to={`/movies/${movie.id}`}>
        <MovieCard movie={movie} />
      </Link>
    </div>
  );
}
