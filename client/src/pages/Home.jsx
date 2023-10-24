import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Home = () => {
  // Check if the user is logged in
  const loggedIn = AuthService.loggedIn();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/spellGame">Spell Game</Link>
          </li>
          <li>
            <Link to="/diceGame">Math Game</Link>
          </li>
          <li>
            <Link to="/concentrationGame">Animal Game</Link>
          </li>
          {loggedIn ? (
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
          ) : (
            <li>
              <Link to="/Login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <div>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Home;
