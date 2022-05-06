import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import movieService from "../services/MovieService";
import { selectActiveMovie } from "../store/movies/selectors";
import { createMovie, editMovie, setActiveMovie } from "../store/movies/slice";

export default function AddMovie() {
  const dispatch = useDispatch();

  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    image_url: "",
    duration: 0,
    release_date: "",
    genre: "",
  });

  const history = useHistory();
  const { id } = useParams();

  const activeMovie = useSelector(selectActiveMovie);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeMovie) {
      dispatch(
        editMovie({
          id: activeMovie.id,
          data: movieData,
          meta: {
            onSuccess: () => {
              history.push(`movies/${activeMovie.id}`);
            },
          },
        })
      );
    } else {
      dispatch(
        createMovie({
          data: movieData,
          meta: {
            onSuccess: (data) => {
              history.push(`movies/${data.id}`);
            },
          },
        })
      );
      history.push("movies");
    }
  };

  const handleReset = () => {
    setMovieData({
      title: "",
      director: "",
      image_url: "",
      duration: 0,
      release_date: "",
      genre: "",
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(setActiveMovie(id));
    }
  }, [id]);

  useEffect(() => {
    if (activeMovie) {
      const { id: _, created_at, ...restData } = activeMovie;
      setMovieData(restData);
    }
  }, [activeMovie]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add new"} </h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          minLength={2}
          value={movieData.title}
          placeholder="Title"
          onChange={({ target }) =>
            setMovieData({ ...movieData, title: target.value })
          }
        />
        <input
          required
          minLength={2}
          value={movieData.director}
          placeholder="Director"
          onChange={({ target }) =>
            setMovieData({ ...movieData, director: target.value })
          }
        />
        <input
          required
          minLength={2}
          value={movieData.image_url}
          placeholder="Image url"
          onChange={({ target }) =>
            setMovieData({ ...movieData, image_url: target.value })
          }
        />
        <input
          required
          type="number"
          min={1}
          max={600}
          value={movieData.duration}
          placeholder="Duration"
          onChange={({ target }) =>
            setMovieData({ ...movieData, duration: target.value })
          }
        />
        <input
          required
          type="date"
          value={movieData.release_date}
          placeholder="Release date"
          onChange={({ target }) =>
            setMovieData({ ...movieData, release_date: target.value })
          }
        />
        <input
          required
          minLength={2}
          value={movieData.genre}
          placeholder="Genre"
          onChange={({ target }) =>
            setMovieData({ ...movieData, genre: target.value })
          }
        />
        <button>{id ? "Save" : "Add"}</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
