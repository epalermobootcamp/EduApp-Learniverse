import { Link, useLocation } from 'react-router-dom';
import ('../style/general.css');
import AuthService from '../utils/auth';


function Navigation() {
    const currentPage = useLocation().pathname;
      // Check if the user is logged in
  const loggedIn = AuthService.loggedIn();

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link
                    to="/"
                    className={currentPage === '/Home' ? 'nav-link active' : 'nav-link'}
                >
                    Home
                </Link>
            </li>
            {loggedIn ? (
            <li className="nav-item">
                <Link
                    to="/Profile"
                    className={currentPage === '/Profile' ? 'nav-link active' : 'nav-link'}
                >
                    My Account
                </Link>
            </li>
            ) : (
                <li className="nav-item">
                <Link
                    to="/Login"
                    className={currentPage === '/Login' ? 'nav-link active' : 'nav-link'}
                >
                    Login/Sign Up
                </Link>
            </li>
            )}
            <li className="nav-item">
                <Link
                    to="/diceGame"
                    className={currentPage === '/dicGame' ? 'nav-link active' : 'nav-link'}
                >
                    Dice Game
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/concentrationGame"
                    className={currentPage === '/concentrationGame' ? 'nav-link active' : 'nav-link'}
                >
                    Concentration Game
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/spellGame"
                    className={currentPage === '/spellGame' ? 'nav-link active' : 'nav-link'}
                >
                    Guess the word
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/scores"
                    className={currentPage === '/scores' ? 'nav-link active' : 'nav-link'}
                >
                    Scores
                </Link>
            </li>
        </ul>
    );
}

export default Navigation;
