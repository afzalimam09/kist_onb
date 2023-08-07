import "./profile.css";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";
import BackToTop from "../../../components/shared/backtotop/BackToTop";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../../../redux/userRedux";
import { useEffect } from "react";
import { userRequest } from "../../../requestMethods";
import ProfileInfo from "../../../components/client/profile/ProfileInfo";
import ChangeProfile from "../../../components/client/profile/ChangeProfile";
import ChangePassword from "../../../components/client/profile/ChangePassword";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const me = user.data;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await userRequest.get("/user/me");
                dispatch(updateSuccess(res.data.data));
            } catch (error) {
                console.log(error);
            }
        };
        getMe();
    }, [dispatch]);

    return (
        <>
            <Header />
            <section
                className="section profile"
                style={{ backgroundImage: "url('/images/newsletter-bg.jpg')" }}
            >
                <div className="container">
                    {me.status !== "Active" && (
                        <div className="warning-wrapper">
                            <p>
                                Your account is currently {me.status}. Please
                                contact your admin to verify.
                            </p>
                            <p>
                                Otherwise you will not get new notice
                                information on your email.
                            </p>
                        </div>
                    )}

                    <ProfileInfo me={me} />
                    <ChangeProfile me={me} />
                    <ChangePassword />
                </div>
            </section>
            <Footer />
            <BackToTop />
        </>
    );
};

export default Profile;
