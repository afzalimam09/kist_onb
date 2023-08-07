import { useEffect, useState } from "react";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";
import BackToTop from "../../../components/shared/backtotop/BackToTop";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/apiCalls";
import { notyf } from "../../../alert";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            notyf.error("Please enter required fields!");
            return;
        }
        const res = await login(dispatch, { email, password });
        if (res.status === "success") {
            notyf.success("Successfully logged in");
            navigate("/");
        } else if (res.status === "fail") {
            notyf.error(res.message);
        }
    };

    return (
        <>
            <Header />
            <section
                className="section login"
                style={{ backgroundImage: "url('/images/newsletter-bg.jpg')" }}
            >
                <div className="container">
                    <div className="form-wrapper">
                        <h3 className="h3 form-title">LOGIN</h3>
                        <p className="form-text">
                            Login if you are a returning customer!
                        </p>

                        <form className="form-content">
                            <div>
                                <label>
                                    Email Address <span>*</span>
                                </label>
                                <div className="input-wrapper">
                                    <ion-icon name="mail-outline"></ion-icon>
                                    <input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        type="email"
                                        name="email_address"
                                        aria-label="email"
                                        placeholder="Enter your mail address"
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div>
                                <label>
                                    Password <span>*</span>
                                </label>
                                <div className="input-wrapper">
                                    <ion-icon name="lock-open-outline"></ion-icon>
                                    <input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        type={!visible ? "password" : "text"}
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                        className="input-field"
                                    />
                                    <div
                                        className="view-password"
                                        onClick={() => setVisible(!visible)}
                                    >
                                        <ion-icon
                                            name={
                                                !visible
                                                    ? "eye-off-outline"
                                                    : "eye-outline"
                                            }
                                        ></ion-icon>
                                    </div>
                                </div>
                            </div>

                            <p className="forgot-password">
                                <Link to="/">Forgot Password</Link>
                            </p>

                            <button
                                onClick={handleClick}
                                className={`btn-primary login_btn ${
                                    isFetching ? "disabled" : ""
                                }`}
                            >
                                Login
                            </button>
                        </form>

                        <div className="cta">
                            <p>
                                New user?{" "}
                                <Link to="/register" className="a">
                                    Register Here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <BackToTop />
        </>
    );
};

export default Login;
