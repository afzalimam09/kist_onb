import { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector((state) => state.user.currentUser);
    // To controll navigation menu
    const [active, setActive] = useState(false);
    const toggleElm = () => setActive(!active);

    // Header Sticky
    const [scroll, setScroll] = useState(false);
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 100) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    });

    return (
        <header className={`header ${scroll ? "active header-anim" : ""}`}>
            <div className="container">
                <h1>
                    <Link to="/" className="logo">
                        KIST College
                    </Link>
                </h1>

                <nav className={`navbar ${active ? "active" : ""}`}>
                    <div className="navbar-top">
                        <Link to="/" className="logo">
                            KIST College
                        </Link>
                        <button
                            onClick={toggleElm}
                            className="nav-close-btn"
                            aria-label="Close menu"
                        >
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>

                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link
                                to="/"
                                onClick={toggleElm}
                                className="navbar-link"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link
                                to="/bookmark"
                                onClick={toggleElm}
                                className="navbar-link"
                            >
                                Bookmarks
                            </Link>
                        </li>
                        {!user && (
                            <>
                                <li className="navbar-item">
                                    <Link
                                        to="/login"
                                        onClick={toggleElm}
                                        className="navbar-link"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        to="/register"
                                        onClick={toggleElm}
                                        className="navbar-link"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className="navbar-item">
                                    <Link
                                        to="/profile"
                                        onClick={toggleElm}
                                        className="navbar-link"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        to="/notification"
                                        onClick={toggleElm}
                                        className="navbar-link"
                                    >
                                        Notification
                                    </Link>
                                </li>
                            </>
                        )}
                        {user?.data?.isAdmin && (
                            <li className="navbar-item">
                                <Link
                                    to="/admin/dashboard"
                                    onClick={toggleElm}
                                    className="navbar-link"
                                >
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="header-actions">
                    {!user ? (
                        <Link
                            to="/login"
                            className="header-action-btn login-btn"
                        >
                            <ion-icon
                                name="person-outline"
                                aria-hidden="true"
                            ></ion-icon>

                            <span className="span">Login / Register</span>
                        </Link>
                    ) : (
                        <Link
                            to="/profile"
                            className="header-action-btn login-btn"
                        >
                            <ion-icon
                                name="person-outline"
                                aria-hidden="true"
                            ></ion-icon>

                            <span className="span">My Profile</span>
                        </Link>
                    )}

                    <button
                        onClick={toggleElm}
                        className="header-action-btn nav-open-btn"
                        aria-label="Open menu"
                    >
                        <ion-icon name="menu-outline"></ion-icon>
                    </button>
                </div>

                <div
                    className={`overlay ${active ? "active" : ""}`}
                    onClick={toggleElm}
                ></div>
            </div>
        </header>
    );
};

export default Header;
