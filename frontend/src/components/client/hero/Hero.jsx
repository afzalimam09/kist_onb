import "./hero.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <section
            className="hero"
            id="home"
            aria-label="hero"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        >
            <div className="container">
                <div className="hero-content">
                    <p className="section-subtitle">We Nurture the Talent!</p>

                    <h2 className="h1 hero-title">
                        KIST College Online Notice Board
                    </h2>

                    <p className="hero-text">
                        Welcome to Konark Institute of Science and Technology.
                        Get all the notices directly on your email!
                    </p>
                    {user ? (
                        <Link to="/profile" className="btn btn-primary">
                            <span className="span">My Profile</span>

                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </Link>
                    ) : (
                        <Link to="/register" className="btn btn-primary">
                            <span className="span">Get Started Today</span>

                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </Link>
                    )}
                </div>

                <figure className="hero-banner">
                    <img
                        src="/images/hero-banner-1.png"
                        width="500"
                        height="500"
                        loading="lazy"
                        alt="hero"
                        className="w-100 hero-banner-img"
                    />

                    {/* <img
                        src="/images/hero-abs-12.jpeg"
                        width="318"
                        height="352"
                        loading="lazy"
                        alt="hero"
                        aria-hidden="true"
                        className="abs-img abs-img-1"
                    /> */}

                    {/* <img
                        src="/images/hero-abs-21.jpeg"
                        width="160"
                        height="160"
                        loading="lazy"
                        alt="hero"
                        aria-hidden="true"
                        className="abs-img abs-img-2"
                    /> */}
                </figure>
            </div>
        </section>
    );
};

export default Hero;
