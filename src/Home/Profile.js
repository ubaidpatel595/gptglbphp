import React, { useState } from 'react';
import './Css/login.css'
const Profile = ({ user }) => {
  const [userId, setUserId] = useState(user.userid);
  const [name, setName] = useState(user.name);
  const [course, setCourse] = useState(user.branch);
  const [mobile, setMobile] = useState(localStorage.mobile);
  const [sem, setSem] = useState(user.sem);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code here to update the user's profile
  };

  return (
    <form onSubmit={handleSubmit} id="login-form">
      <label htmlFor="userId">User ID:</label>
      <input
        type="text"
        id="userId"
        value={userId}
        onChange={(event) => setUserId(event.target.value)}
      />
      <br />
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <br />
      <label htmlFor="mobile">Mobile:</label>
      <input
        type="text"
        id="mobile"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
      />
      <br />
      <label htmlFor="sem">Semester:</label>
      <input
      disabled="true"
        type="text"
        id="sem"
        value={sem}
        onChange={(event) => setSem(event.target.value)}
      />
      <br />
      <label htmlFor="course">Branch:</label>
      <input
        type="text"
        id="course"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
      />
      <br />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
