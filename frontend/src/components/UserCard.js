import React, { useRef, useState } from 'react';
import Axios from 'axios';

/**
 * Individual card for each User
 * @param {{ 
 *  id: Number, 
 *  first_name: String,
 * 	last_name: String,
 * 	email: String,
 *  dob: Date,
 *  deleteUser: Function, 
 *  fetchUsers: Function 
 * }}
 */
export default function UserCard({
  id,
  first_name,
  last_name,
  email,
  dob,
  deleteUser,
  fetchUsers
}) {
  // State variables to update user with
  const [showForm, setShowForm] = useState(false);
  const [newFirstName, setNewFirstName] = useState(first_name);
  const [newLastName, setNewLastName] = useState(last_name);
  const [newEmail, setNewEmail] = useState(email);
  const [newDob, setNewDob] = useState(dob);
  const updateFormRef = useRef(null);
  const USER_ENDPOINT = 'http://localhost:3002/api/users';

  function updateUser() {
    Axios.put(`${USER_ENDPOINT}/${id}`, {
      first_name: newFirstName,
	  last_name: newLastName,
	  email: newEmail,
	  dob: newDob
    }).then((response) => {
      fetchUsers();
      setShowForm(false);
    });
  }

  return (
    <div
      style={{
        width: '40%',
        paddingLeft: 'auto',
        paddingRight: 'auto',
        paddingBottom: 10,
        margin: 5,
        borderStyle: 'solid',
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 30,
      }}
    >
      {/* User info */}
      <h4>
        {} (ID: {id})
      </h4>
      <p>First Name: {first_name}</p>
	  <p>Last Name: {last_name}</p>

      {/* Form to update User */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{ borderRadius: 8 }}
      >
        Toggle update form
      </button>
      {showForm && (
        <form
          ref={updateFormRef}
          onSubmit={(e) => {
            e.preventDefault();
            updateUser();
          }}
          style={{
            margin: 10
          }}
        >
          <label style={{ margin: 10 }}>Update first name</label>
          <input type="text" onChange={(e) => setNewFirstName(e.target.value)} />

          <br />

		  <label style={{ margin: 10 }}>Update last name</label>
          <input type="text" onChange={(e) => setNewLastName(e.target.value)} />

          <br />

          <label style={{ margin: 10 }}>Update email</label>
          <input type="text" onChange={(e) => setNewEmail(e.target.value)} />

          <br />

		  <label style={{ margin: 10 }}>Update dob</label>
          <input type="date" onChange={(e) => setNewDob(e.target.value)} />

          <input type="submit" />
        </form>
      )}

      <br />

      {/* Delete user button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingRight: '10%',
        }}
      >
        <button
          onClick={() => deleteUser(id)}
          style={{
            backgroundColor: 'darkred',
            color: 'white',
            borderRadius: 8,
          }}
        >
          Delete this user
        </button>
      </div>
    </div>
  );
}
