import { takeLatest, call, put } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
  setActiveUser,
  setToken,
  login,
  register,
  logout,
  getActiveUser,
} from "./slice";

// workers
function* handleLogin(action) {
  try {
    // const data = await authService.login(userData);
    const data = yield call(authService.login, action.payload);
    localStorage.setItem("token", data.token);

    // dispatch(setActiveUser(data.user));
    yield put(setActiveUser(data.user));

    // dispatch(setToken(data.token));
    yield put(setToken(data.token));
  } catch {
    alert("Invalid credentials");
  }
}

function* handleRegister({ payload }) {
  try {
    // const data = await authService.register(userData);
    const data = yield call(authService.register, payload);
    localStorage.setItem("token", data.token);

    // dispatch(setActiveUser(data.user));
    yield put(setActiveUser(data.user));

    // dispatch(setToken(data.token));
    yield put(setToken(data.token));
  } catch (error) {
    alert("Registration failed");
  }
}

function* handleLogout() {
  try {
    yield call(authService.logout);
    localStorage.removeItem("token");

    yield put(setToken(null));
    yield put(setActiveUser(null));
  } catch (error) {}
}

function* handleGetActiveUser() {
  try {
    const activeUser = yield call(authService.getMyProfile);
    yield put(setActiveUser(activeUser));
  } catch (error) {}
}

// watchers
export function* watchLogin() {
  yield takeLatest(login.type, handleLogin);
}
export function* watchRegister() {
  yield takeLatest(register.type, handleRegister);
}
export function* watchLogout() {
  yield takeLatest(logout.type, handleLogout);
}
export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, handleGetActiveUser);
}
