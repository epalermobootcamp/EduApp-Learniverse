import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

const Profile = () => {
  const logout = (event) => {
    event.preventDefault();
    AuthService.logout();
    window.location.assign('/');
  };
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
      <button className="btn btn-lg btn-light m-2" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
