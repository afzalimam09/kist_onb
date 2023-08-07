import dateFormat from "dateformat";
import { add } from "../../../redux/bookmarkRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notyf } from "../../../alert";

const Notice = ({ notice }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookmark = useSelector((state) => state.bookmark);
    const saveToBookmark = (notice) => {
        if (bookmark) {
            const index = bookmark.findIndex(
                (items) => items._id === notice._id
            );
            if (index >= 0) {
                notyf.error("Already bookmarked!");
                return;
            }
        }
        dispatch(add(notice));
        notyf.success("Added to bookmark!");
    };
    const handleView = (id) => {
        navigate(`/notice/${id}`);
    };
    return (
        <li>
            <div className="notice-card">
                <figure className="card-banner">
                    <img
                        src={notice.imageUrl}
                        width="370"
                        height="270"
                        loading="lazy"
                        alt={notice.title}
                        className="img-cover"
                    />
                </figure>

                <div className="card-content">
                    <h3 className="h3">
                        <a href={notice.imageUrl} className="card-title">
                            {notice.title}
                        </a>
                    </h3>

                    {/* <div className="tag-wrapper">
                        <span className="people-icon">
                            <ion-icon
                                name="people-outline"
                                aria-hidden="true"
                            ></ion-icon>
                        </span>
                        <div className="branch">
                            <p>B-Tech</p>
                            <p>IMBA</p>
                            <p>M-Tech</p>
                        </div>
                    </div> */}

                    <div className="date-badge">
                        <ion-icon name="calendar-outline"></ion-icon>
                        <span className="date">
                            {dateFormat(notice.createdAt, "mmm d, yyyy")}
                        </span>
                    </div>

                    <div className="card-footer">
                        <button
                            onClick={() => handleView(notice._id)}
                            className="card-btn btn-primary"
                        >
                            <ion-icon name="eye-outline"></ion-icon>
                            <span>View</span>
                        </button>
                        <button
                            onClick={() => saveToBookmark(notice)}
                            className="card-btn btn-primary"
                        >
                            <ion-icon name="save-outline"></ion-icon>
                            <span>Bookmark</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default Notice;
