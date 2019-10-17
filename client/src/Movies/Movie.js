import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateMovie from "../UpdateMovie";
import { Route, NavLink } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  
  deleteMovie = id => e => {
    axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            this.props.setMovies(this.props.movies.filter(movie => movie.id !== id))
            this.props.history.push('/')
        })
        .catch(err => console.log(err.response));
}



  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <div>
          <MovieCard movie={this.state.movie} />

          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>

          <NavLink to={`/update-movie/${this.state.movie.id}`}>
            <button> Edit Movie </button>
          </NavLink>
          <hr />
          <button onClick={this.deleteMovie(this.state.movie.id)}> Delete Movie </button>
          <hr />
        </div>
      </div>
    );
  }
}
