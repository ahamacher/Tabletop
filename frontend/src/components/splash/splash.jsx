import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => (
    <section id="splash">
        <section id="splash-content">
            <h1>It's time to ditch Skype and Roll20</h1>
            <p>All-in-one virtual tabletop simulator and text chat for tabletop gamers that's free and secure.</p>
            <section id="splash-buttons">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </section>
        </section>
        <i className="fas fa-dice-d20"></i>
    </section>
);

export default Splash;