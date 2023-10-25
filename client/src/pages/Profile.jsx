import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Profile = () => {
  // Get the user's profile information
  const userProfile = AuthService.getProfile();

  if (!userProfile) {
    return <p>No user profile available.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {userProfile.username}
      </p>
      <p>
        <strong>Email:</strong> {userProfile.email}
      </p>
      {/* Add more profile information here */}
    </div>
  );
};

export default Profile;
