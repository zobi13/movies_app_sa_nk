import { useDispatch, useSelector } from "react-redux";
import { selectActiveUser } from "../store/activeUser/selectors";
import { logout } from "../store/activeUser/slice";

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector(selectActiveUser);

  async function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <>
          <h4>{user.name}</h4>
          <h5>{user.email}</h5>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}
