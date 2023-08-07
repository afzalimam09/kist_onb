import "../main.css";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useState } from "react";
import BackToTop from "../../../components/shared/backtotop/BackToTop";
import Index from "../../../components/admin/index/Index";
import Notice from "../../../components/admin/notice/Notice";
import Student from "../../../components/admin/student/Student";
import Faculty from "../../../components/admin/faculty/Faculty";
import AddNotice from "../../../components/admin/add-notice/AddNotice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UpdateNotice from "../../../components/admin/update-notice/UpdateNotice";
import UserView from "../../../components/admin/user-view/UserView";

const Dashboard = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    let imgUrl;
    if (currentUser) {
        imgUrl = currentUser.data.profileImg;
    }
    // For navbar and dynamic component rendering
    const [navClicked, setNavClicked] = useState(false);
    const [component, setComponent] = useState("Index");
    const [noticeData, setNoticeData] = useState({});
    const [userData, setUserData] = useState({});

    const clickedComponent = (item) => {
        setComponent(item);
    };

    return (
        <>
            <Sidebar
                navClicked={navClicked}
                component={component}
                clickedComponent={clickedComponent}
            />
            <section id="content">
                <nav>
                    <i
                        onClick={() => setNavClicked(!navClicked)}
                        className="bx bx-menu"
                    ></i>
                    <Link to="/profile" className="profile">
                        <img src={imgUrl} alt="profile" />
                    </Link>
                </nav>

                {component === "Index" && (
                    <Index
                        clickedComponent={clickedComponent}
                        setUserData={setUserData}
                    />
                )}
                {component === "Notice" && (
                    <Notice
                        clickedComponent={clickedComponent}
                        setNoticeData={setNoticeData}
                    />
                )}
                {component === "Student" && (
                    <Student
                        clickedComponent={clickedComponent}
                        setUserData={setUserData}
                    />
                )}
                {component === "Faculty" && (
                    <Faculty
                        clickedComponent={clickedComponent}
                        setUserData={setUserData}
                    />
                )}
                {component === "UpdateNotice" && (
                    <UpdateNotice noticeData={noticeData} />
                )}
                {component === "UserView" && <UserView userData={userData} />}
                {component === "AddNotice" && (
                    <AddNotice clickedComponent={clickedComponent} />
                )}
            </section>
            <BackToTop />
        </>
    );
};

export default Dashboard;
