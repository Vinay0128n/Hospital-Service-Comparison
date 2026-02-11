import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };

        window.addEventListener('auth-change', handleAuthChange);
        return () => window.removeEventListener('auth-change', handleAuthChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('auth-change'));
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    HospitalCompare
                </Link>

                <div className="nav-menu-wrapper">
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/" className="nav-links">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/search" className="nav-links">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-links">About</Link>
                        </li>
                    </ul>

                    {user ? (
                        <div className="user-profile-nav">
                            <Link to="/my-appointments" className="nav-links auth-link">My Appointments</Link>
                            <span className="welcome-text">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn-logout">Logout</button>
                        </div>
                    ) : (
                        <div className="auth-nav-buttons">
                            <Link to="/login" className="btn-login-nav">Login</Link>
                            <Link to="/register" className="btn-register-nav">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
