import React from 'react';
import AuthService from '../utils/auth';
import Logo from '../assets/images/logo.png';
import ('../style/general.css');

const Home = () => {
 
  const loggedIn = AuthService.loggedIn();

  return (
    <div>
      <img src={Logo} alt="Cartoon puppy with learniverse underneath" className='img-fluid'/>
      </div>
  )
};

export default Home;
