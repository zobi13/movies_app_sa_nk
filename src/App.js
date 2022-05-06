import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from "./components/shared/PrivateRoute";
import AddMovie from "./pages/AddMovie";
import AppMovies from "./pages/AppMovies";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SingleMovie from "./pages/SingleMovie";
import { increment } from "./store/counter/slice";
import { useEffect, useState } from "react";
import { selectCounterValue } from "./store/counter/selectors";
import { selectIsAuthenticated } from "./store/activeUser/selectors";
import authService from "./services/AuthService";
import { getActiveUser, setActiveUser } from "./store/activeUser/slice";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();

  const counterValue = useSelector(selectCounterValue);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, []);

  function incrementCounter() {
    dispatch(increment());
  }
  return (
    <div className="App">
      <h1 onClick={incrementCounter}>COUNTER VALUE: {counterValue}</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/add-movie">Add movie</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/profile">My profile</Link>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <Route exact path="/movies">
            <AppMovies />
          </Route>
          <Route exact path="/movies/:id">
            <SingleMovie />
          </Route>
          <PrivateRoute exact path="/add-movie">
            <AddMovie />
          </PrivateRoute>
          <Route exact path="/edit/:id">
            <AddMovie />
          </Route>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <PrivateRoute exact path="/profile">
            <Profile />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect to="/movies" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
