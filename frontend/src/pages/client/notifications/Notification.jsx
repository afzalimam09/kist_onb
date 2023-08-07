import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";
import BackToTop from "../../../components/shared/backtotop/BackToTop";
import { userRequest } from "../../../requestMethods";
import dateFormat from "dateformat";
import "./notification.css";
import { notyf } from "../../../alert";

const Notification = () => {
    const user = useSelector((state) => state.user.currentUser);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await userRequest.get(
                    `/notification?userId=${user.data._id}`
                );
                setNotifications(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [user.data._id]);
    const handleDismis = async (id) => {
        try {
            await userRequest.delete(`/notification/${id}`);
            const updatedNotif = notifications.filter(
                (item) => item._id !== id
            );
            setNotifications(updatedNotif);
            notyf.success("Notification deleted successfully!");
        } catch (error) {
            console.log(error);
            notyf.error("Something went wrong. Try Again!");
        }
    };
    return (
        <>
            <Header />
            <section
                className="section notification"
                style={{ backgroundImage: "url('/images/newsletter-bg.jpg')" }}
            >
                <div className="container">
                    <div className="wrapper">
                        <h2 className="h2 section-title">Notifications </h2>
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className="single-notification"
                            >
                                <div className="top">
                                    <p className="tag">
                                        {dateFormat(
                                            notification.createdAt,
                                            "mmm d, yyyy, h:MM TT"
                                        )}
                                    </p>
                                    <p
                                        onClick={() =>
                                            handleDismis(notification._id)
                                        }
                                        className="tag dismis"
                                    >
                                        Dismiss
                                    </p>
                                </div>
                                <hr />
                                <p className="content">
                                    {notification.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
            <BackToTop />
        </>
    );
};

export default Notification;
