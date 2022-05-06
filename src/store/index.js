import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import counterReducer from "./counter/slice";
import activeUserReducer from "./activeUser/slice";
import moviesReducer from "./movies/slice";

import sagas from "./sagas";

const reducers = {
  counter: counterReducer,
  activeUser: activeUserReducer,
  movies: moviesReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    sagaMiddleware,
  ],
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;

// const initialState = 0;
// function counterReducer(currentState = initialState, action) {
//   console.log("counter reducer >> action: ", action);
//   if (action.type == "increment") {
//     return currentState + 1;
//   }
//   if (action.type == "decrement") {
//     return currentState - 1;
//   }
//   if (action.type == "setValue") {
//     return action.payload;
//   }

//   return currentState;
// }

// const store = configureStore({
//   reducer: combineReducers({
//     counter: counterReducer,
//   }),
// });

// console.log("store created", { state: store.getState() });

// store.dispatch({
//   type: "incrment",
// });
// console.log({ state: store.getState() });

// store.dispatch({
//   type: "incremnt",
// });
// console.log({ state: store.getState() });

// store.dispatch({
//   type: "incremnt",
// });
// console.log({ state: store.getState() });

// function decrement() {
//   return {
//     type: "decrement",
//   };
// }
// store.dispatch(decrement());

// function setValue(value) {
//   return {
//     type: "setValue",
//     payload: value,
//   };
// }
// store.dispatch(setValue(5));
// console.log({ state: store.getState() });
