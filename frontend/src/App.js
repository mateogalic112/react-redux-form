import React from "react";
import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { listUsers, createUser, deleteUser } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();

  const [userData, setUserData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createUser({ ...userData }));

    setUserData({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const handleDelete = (userID) => {
    dispatch(deleteUser(userID));
  };

  React.useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const {
    loading: loadingList,
    error: errorList,
    users,
  } = useSelector((state) => state.userList);

  if (loadingList) return <p>Loading...</p>;

  if (errorList) return <p>{errorList.message}</p>;

  console.log(errorList);

  return (
    <div className="wrapper">
      <h1>Users table</h1>
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Akcije</th>
          </tr>
        </thead>
        {/* Users list goes here */}
        <tbody>
          {users?.length > 0 &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>x</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Unesi korisnika</legend>
          <input
            type="text"
            name="firstName"
            placeholder="Ime"
            required
            onChange={handleChange}
            value={userData.firstName}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Prezime"
            required
            onChange={handleChange}
            value={userData.lastName}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={userData.email}
          />
          <button type="submit">Kreiraj</button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
