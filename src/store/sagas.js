import * as activeUserSagas from "./activeUser/sagas";
import * as moviesSagas from "./movies/sagas";

const sagas = {
  ...activeUserSagas,
  ...moviesSagas,
};

export default sagas;
