// import react from 'react';
import { Link } from 'react-router-dom';


const MainHeader = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/About">About Us</Link>
                </li>
                <li>
                    <Link to="/Login">Login/Register</Link>
                </li>
            </ul>
        </nav>

    );

};
export default MainHeader;