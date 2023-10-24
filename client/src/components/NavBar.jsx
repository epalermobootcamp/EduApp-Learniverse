import { Link, useLocation } from 'react-router-dom';
import ('../style/general.css');


function Navigation() {
    const currentPage = useLocation().pathname;

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
