import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";
import movieService from "../services/MovieService";

export default function SingleMovie() {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    image_url: "",
    duration: 1,
    release_date: "",
    genre: "",
  });

  const { id } = useParams();
  const formattedDate = useFormattedDate(
    movie ? movie.release_date : "",
    "yyyy-MM-dd"
  );

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await movieService.get(id);
      setMovie(data);
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <Redirect to="/movies" />;
  }

  return (
    <div style={{ marginLeft: 5 }}>
      <h2>{movie.title}</h2>
      <h4>{movie.director}</h4>
      <img src={movie.image_url} width="300" height="300" />
      <p>Genre: {movie.genre}</p>
      <p>Release date: {formattedDate}</p>
      <p>Duration: {movie.duration}</p>
    </div>
  );
}
