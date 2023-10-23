import { Link, useLocation } from 'react-router-dom';
import ('../style/general.css');


function Navigation() {
    const currentPage = useLocation().pathname;

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link
                    to="/"
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/diceGame"
                    className={currentPage === '/AboutMe' ? 'nav-link active' : 'nav-link'}
                >
                    Dice Game
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/concentrationGame"
                    className={currentPage === '/Portfolio' ? 'nav-link active' : 'nav-link'}
                >
                    Concentration Game
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/spellGame"
                    className={currentPage === '/Resume' ? 'nav-link active' : 'nav-link'}
                >
                    Guess the word
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/scores"
                    className={currentPage === '/Contact' ? 'nav-link active' : 'nav-link'}
                >
                    Scores
                </Link>
            </li>
        </ul>
    );
}

export default Navigation;
