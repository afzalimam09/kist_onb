import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            KIST College
                        </Link>

                        <p className="section-text">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                        </p>

                        <ul className="social-list">
                            <li>
                                <a href="/" className="social-link">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                </a>
                            </li>

                            <li>
                                <a href="/" className="social-link">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                </a>
                            </li>

                            <li>
                                <a href="/" className="social-link">
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-list-title">Explore</p>
                        </li>

                        <li>
                            <Link to="/about" className="footer-link">
                                <ion-icon
                                    name="chevron-forward"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">About Us</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/faq" className="footer-link">
                                <ion-icon
                                    name="chevron-forward"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">FAQ</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/privacy-policy" className="footer-link">
                                <ion-icon
                                    name="chevron-forward"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">Privacy Policy</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-list-title">Useful Links</p>
                        </li>

                        <li>
                            <Link to="/contact" className="footer-link">
                                <ion-icon
                                    name="chevron-forward"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">Contact Us</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/admin" className="footer-link">
                                <ion-icon
                                    name="chevron-forward"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">Admin Profile</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/" className="footer-link">
                                <ion-icon
                                    name="chevron-forward"
                                    aria-hidden="true"
                                ></ion-icon>

                                <span className="span">Recent Notices</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="footer-list-title">Contact Info</p>
                        </li>

                        <li className="footer-item">
                            <ion-icon
                                name="location-outline"
                                aria-hidden="true"
                            ></ion-icon>

                            <address className="footer-link">
                                KIST College, Jatani, Bhubaneshwar, Odisha -
                                752050
                            </address>
                        </li>

                        <li className="footer-item">
                            <ion-icon name="call" aria-hidden="true"></ion-icon>

                            <a href="tel:+916206864101" className="footer-link">
                                +91 6206864101
                            </a>
                        </li>

                        <li className="footer-item">
                            <ion-icon
                                name="mail-outline"
                                aria-hidden="true"
                            ></ion-icon>

                            <a
                                href="mailto:contact@kistcollege.com"
                                className="footer-link"
                            >
                                contact@kistcollege.com
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        Copyright 2022 KIST College. All Rights Reserved by{" "}
                        <Link to="/" className="copyright-link">
                            KIST College
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
