import { put, takeLatest, call } from "@redux-saga/core/effects";

import movieService from "../../services/MovieService";
import {
  addMovie,
  createMovie,
  deleteMovie,
  deleteMovieSuccess,
  editMovie,
  getMovies,
  setMovies,
  updateMovie,
} from "./slice";

function* handleGetMovies({ payload }) {
  try {
    const movies = yield call(movieService.getAll);
    yield put(setMovies(movies));
  } catch (error) {
    console.log(error);
  }
}

function* handleDeleteMovie({ payload }) {
  try {
    yield call(movieService.delete, payload);
    yield put(deleteMovieSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateMovie({ payload }) {
  try {
    const newMovie = yield call(movieService.add, payload.data);

    yield put(addMovie(newMovie));

    if (payload.meta?.onSuccess) {
      yield call(payload.meta.onSuccess, newMovie);
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleEditMovie({ payload }) {
  try {
    const movie = yield call(movieService.edit, payload.id, payload.data);

    yield put(updateMovie(movie));

    if (payload.meta?.onSuccess) {
      yield call(payload.meta.onSuccess, movie);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetMovies() {
  yield takeLatest(getMovies.type, handleGetMovies);
}
export function* watchDeleteMovie() {
  yield takeLatest(deleteMovie.type, handleDeleteMovie);
}
export function* watchCreateMovie() {
  yield takeLatest(createMovie.type, handleCreateMovie);
}
export function* watchEditMovie() {
  yield takeLatest(editMovie.type, handleEditMovie);
}
