export function selectMovies(state) {
  return state.movies.page;
}

export function selectActiveMovie(state) {
  return state.movies.page.data.find(
    (movie) => movie.id == state.movies.activeMovieId
  );
}
