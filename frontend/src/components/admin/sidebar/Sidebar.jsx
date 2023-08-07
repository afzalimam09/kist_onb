import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ navClicked, clickedComponent, component }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    return (
        <section id="sidebar" className={navClicked ? "hide" : ""}>
            <a href="/" className="brand">
                <i className="bx bxs-graduation"></i>
                <span className="text">KIST</span>
            </a>
            <ul className="side-menu top">
                <li
                    className={component === "Index" ? "active" : ""}
                    onClick={() => clickedComponent("Index")}
                >
                    <p>
                        <i className="bx bxs-dashboard"></i>
                        <span className="text">Dashboard</span>
                    </p>
                </li>
                <li
                    className={component === "AddNotice" ? "active" : ""}
                    onClick={() => clickedComponent("AddNotice")}
                >
                    <p>
                        <i className="bx bx-plus"></i>
                        <span className="text">Add Notice</span>
                    </p>
                </li>

                <li
                    className={component === "Notice" ? "active" : ""}
                    onClick={() => clickedComponent("Notice")}
                >
                    <p>
                        <i className="bx bxs-message-dots"></i>
                        <span className="text">Notices</span>
                    </p>
                </li>

                <li
                    className={component === "Faculty" ? "active" : ""}
                    onClick={() => clickedComponent("Faculty")}
                >
                    <p>
                        <i className="bx bxs-group"></i>
                        <span className="text">Faculties</span>
                    </p>
                </li>

                <li
                    className={component === "Student" ? "active" : ""}
                    onClick={() => clickedComponent("Student")}
                >
                    <p>
                        <i className="bx bxs-user"></i>
                        <span className="text">Students</span>
                    </p>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <Link to="/profile">
                        <p>
                            <i className="bx bxs-cog"></i>
                            <span className="text">Account</span>
                        </p>
                    </Link>
                </li>
                <li>
                    <p onClick={handleLogout} className="logout">
                        <i className="bx bxs-log-out-circle"></i>
                        <span className="text">Logout</span>
                    </p>
                </li>
            </ul>
        </section>
    );
};

export default Sidebar;
