import React from "react";

export default function UpdateMovie(props) {
  const movieUpdate = {
    title: "",
    director: "",
    metascore: "",
  };

  return (
    <div className="App">
      <div>
        <form>
          <div>
            <label> Title </label>
            <br />
            <input type="text" />
          </div>
          <br />
          <div>
            <label> Director </label>
            <br />
            <input
              type="text"
              name="password"
              //   onChange={handleChange}
              //   value={state.password}
            />
          </div>
          <br />
          <div>
            <label> Metascore </label>
            <br />
            <input
              type="text"
              name="password"
              //   onChange={handleChange}
              //   value={state.password}
            />
          </div>
          <br />
          <div>
            <label> Stars </label>
            <br />
            <input
              type="text"
              name="password"
              //   onChange={handleChange}
              //   value={state.password}
            />
          </div>
          <button type="submit"> Update </button>
        </form>
      </div>
    </div>
  );
}
