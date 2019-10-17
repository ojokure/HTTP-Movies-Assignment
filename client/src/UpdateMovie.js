import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMovie(props) {
  const movieUpdate = {
    id: null,
    title: "",
    director: "",
    metascore: "",
    stars: ""
  };
  const [update, setUpdate] = useState(movieUpdate);

  const handleChange = e => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const id = Number(props.match.params.id);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then(res => {
        setUpdate(movieUpdate);
        props.setMovies(
          props.movies.map(movie => {
            if (movie.id === res.data.id) return res.data;
            return movie;
          })
        );
        props.history.push("/movies/" + id);
      })
      .catch(err => console.log(err));
  };
  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        props.setMovies(res.data);
        setUpdate(
          res.data.find(movie => {
            return movie.id === id;
          })
        );
      })
      .catch(err => console.log(err.response));
  };
  if (props.movies.length < 1) {
    fetchMovies();
    return "Loading...";
  } else if (update.title.length === 0) {
    setUpdate(
      props.movies.find(movie => {
        return movie.id === id;
      })
    );
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label> Title </label>
            <br />
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={update.title}
            />
          </div>
          <br />
          <div>
            <label> Director </label>
            <br />
            <input
              type="text"
              name="director"
              onChange={handleChange}
              value={update.director}
            />
          </div>
          <br />
          <div>
            <label> Metascore </label>
            <br />
            <input
              type="text"
              name="metascore"
              onChange={handleChange}
              value={update.metascore}
            />
          </div>
          <br />
          <div>
            <label> Stars </label>
            <br />
            <input
              type="text"
              name="stars"
              onChange={handleChange}
              value={update.stars}
            />
          </div>
          <button type="submit"> Update </button>
        </form>
      </div>
    </div>
  );
}
