import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectMovies } from "../store/movies/selectors";
import { deleteMovie, getMovies } from "../store/movies/slice";

export default function AppMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);

  const history = useHistory();

  const handleDelete = async (id) => {
    dispatch(deleteMovie(id));
  };

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <div style={{ marginLeft: 5 }}>
      <h2>Movies</h2>
      {movies &&
        movies.data.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "3px solid orange",
              width: 300,
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>
              <strong>Title:</strong> {movie.title}
            </p>
            <p>
              <strong>Text:</strong> {movie.text}
            </p>
            <Link to={`/movies/${movie.id}`}>View movie</Link>
            <button onClick={() => history.push(`/edit/${movie.id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}
