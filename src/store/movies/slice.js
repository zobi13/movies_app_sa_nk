import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  deleteMovie() {},
  createMovie() {},
  editMovie() {},
};
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    page: {
      data: [],
      current_page: 0,
    }, // { data: [], current_page: 1}
    activeMovieId: null,
  },
  reducers: {
    setMovies(state, action) {
      state.page = action.payload;
    },
    deleteMovieSuccess(state, action) {
      state.page.data = state.page.data.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setActiveMovie(state, action) {
      state.activeMovieId = action.payload;
    },

    addMovie(state, action) {
      state.page.data.push(action.payload);
    },

    updateMovie(state, action) {
      let movie = state.page.data.find(
        (movie) => movie.id == action.payload.id
      );
      Object.assign(movie, action.payload);
    },

    ...middlewareActions,
  },
});

export default moviesSlice.reducer;
export const {
  getMovies,
  setMovies,
  deleteMovie,
  deleteMovieSuccess,
  setActiveMovie,
  createMovie,
  editMovie,
  addMovie,
  updateMovie,
} = moviesSlice.actions;
