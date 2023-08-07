import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";
import BackToTop from "../../../components/shared/backtotop/BackToTop";
import "./bookmark.css";
import dateFormat from "dateformat";
import { remove } from "../../../redux/bookmarkRedux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Bookmark = () => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state) => state.bookmark);
    const removeBookmark = (id) => {
        dispatch(remove(id));
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Header />
            <section
                className="section notice bookmark"
                id="notice"
                style={{ backgroundImage: "url('/images/course-bg.jpg')" }}
            >
                <div className="container">
                    <h2 className="h2 section-title">Bookmarks </h2>

                    {bookmarks.length <= 0 ? (
                        <div className="bookmark-not-found">
                            <h3>No notice found in bookmark</h3>
                            <Link className="url" to="/">
                                Go to Home Page
                            </Link>
                        </div>
                    ) : (
                        <ul className="grid-list">
                            {bookmarks.map((bookmark) => (
                                <li key={bookmark._id}>
                                    <div className="notice-card">
                                        <figure className="card-banner">
                                            <img
                                                src={bookmark.imageUrl}
                                                width="370"
                                                height="270"
                                                loading="lazy"
                                                alt="title-img"
                                                className="img-cover"
                                            />
                                        </figure>

                                        <div className="card-content">
                                            <h3 className="h3">
                                                <a
                                                    href={bookmark.imageUrl}
                                                    className="card-title"
                                                >
                                                    {bookmark.title}
                                                </a>
                                            </h3>

                                            <div
                                                className="date-badge"
                                                style={{
                                                    padding: "0",
                                                    paddingBottom: "8px",
                                                }}
                                            >
                                                <ion-icon name="calendar-outline"></ion-icon>
                                                <span className="date">
                                                    {dateFormat(
                                                        bookmark.createdAt,
                                                        "mmm d, yyyy"
                                                    )}
                                                </span>
                                            </div>

                                            <div className="card-footer">
                                                <button className="card-btn btn-primary">
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                    <span>View</span>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        removeBookmark(
                                                            bookmark._id
                                                        )
                                                    }
                                                    className="card-btn btn-primary"
                                                >
                                                    <ion-icon name="close-outline"></ion-icon>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
            <Footer />
            <BackToTop />
        </>
    );
};

export default Bookmark;
