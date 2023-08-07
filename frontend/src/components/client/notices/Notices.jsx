import { useEffect, useState } from "react";
import "./notices.css";
import Notice from "../notice/Notice";
import { publicRequest } from "../../../requestMethods";

const Notices = () => {
    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [notices, setNotices] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getNotices = async () => {
            try {
                setLoading(true);
                const res = await publicRequest.get(
                    `/notice?page=${currentPage}&limit=${pageSize}`
                );
                setLoading(false);
                // setNotices([...notices, ...res.data.data]);
                setNotices((prev) => [...prev, ...res.data.data]);
                setTotalPage(Math.ceil(res.data.totalResults / pageSize));
            } catch (error) {
                console.log(error);
            }
        };
        getNotices();
    }, [currentPage]);

    const handleClick = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <section
            className="section notice"
            id="notice"
            style={{ backgroundImage: "url('/images/course-bg.jpg')" }}
        >
            <div className="container">
                <h2 className="h2 section-title">Recent Notices</h2>

                <ul className="grid-list">
                    {notices.map((notice) => (
                        <Notice notice={notice} key={notice._id} />
                    ))}
                </ul>

                <button
                    onClick={handleClick}
                    className={`btn btn-load-more ${
                        currentPage < totalPage ? "" : "disabled"
                    }`}
                >
                    {!loading ? (
                        <>
                            {currentPage < totalPage ? (
                                <>
                                    <span className="span">Load More</span>
                                    <ion-icon name="arrow-down-outline"></ion-icon>
                                </>
                            ) : (
                                <>
                                    <span className="span">Thats All !</span>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <span className="span">Loading ...</span>
                        </>
                    )}
                </button>
            </div>
        </section>
    );
};

export default Notices;
