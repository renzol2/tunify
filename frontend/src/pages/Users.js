import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import UserCard from '../components/UserCard';

export default function Users() {
  const [userList, setUserList] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDob, setUserDob] = useState(new Date());
  const searchFormRef = useRef(null);
  const newUserFormRef = useRef(null);
  const limit = 50;
  const USER_ENDPOINT = 'http://localhost:3002/api/users';

  function fetchUsers() {
    Axios.get(
      `${USER_ENDPOINT}/${limit}?firstName=${firstName.replace(' ', '%20')}&lastName=${lastName.replace(' ', '%20')}`
    ).then((response) => {
      setUserList(response.data);
    });
  }

  function submitNewUser() {
    Axios.post(`${USER_ENDPOINT}`, {
      first_name: firstName,
	  last_name: lastName,
	  email: userEmail,
	  dob: userDob
    }).then((response) => {
      fetchUsers();
      newUserFormRef.current.reset();
    });
  }

  function deleteUser(userId) {
    Axios.delete(`${USER_ENDPOINT}/${userId}`).then(fetchUsers);
  }

  useEffect(() => {
    Axios.get(`${USER_ENDPOINT}/${limit}`).then((response) => {
      setUserList(response.data);
    });
  }, []);

  return (
    // Container
    <div
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    >
      <h2>Users</h2>

      <h3>Add new user</h3>
      <form
        ref={newUserFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          submitNewUser();
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <label style={{ margin: 10 }}>User name</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <input type="submit" style={{ margin: 10 }} />
      </form>

      {/* Search bar */}
      <h3>Search users</h3>
      <form
        ref={searchFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          fetchUsers();
          searchFormRef.current.reset();
        }}
      >
        <label style={{ padding: 10 }}>Search artist by name</label>
        <input
          type="text"
          id="search-name-input"
          onChange={(e) => setNameQuery(e.target.value)}
        />
        <input type="submit" />
      </form>

      {/* User list container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {userList.map((user) => (
          <UserCard
            key={user.user_id}
            id={user.user_id}
            first_name={user.first_name}
            last_name={user.last_name}
			email={user.email}
			dob={user.dob}
            deleteUser={deleteUser}
            fetchUsers={fetchUsers}
          />
        ))}
      </div>
    </div>
  );
}
