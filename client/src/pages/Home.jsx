import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';

const Home = () => {
 
  const loggedIn = AuthService.loggedIn();

  return (
    <div>
      
      </div>
  )
};

export default Home;
