import React, { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethods";

const Faculty = ({ clickedComponent, setUserData }) => {
    const pageSize = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [faculties, setFaculties] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFaculties = async () => {
            try {
                setLoading(true);
                const res = await userRequest.get(
                    `user?role=Faculty&page=${currentPage}&limit=${pageSize}`
                );
                setLoading(false);
                setFaculties((prev) => [...prev, ...res.data.data]);
                setTotalPage(Math.ceil(res.data.totalResults / pageSize));
            } catch (error) {
                console.log(error);
            }
        };
        getFaculties();
    }, [currentPage]);

    const handleClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleView = (student) => {
        clickedComponent("UserView");
        setUserData(student);
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>All Faculties</h1>
                </div>
            </div>

            <div className="table-data">
                <div className="order">
                    <table>
                        <thead>
                            <tr>
                                <th>Faculty Id</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map((faculty) => (
                                <tr key={faculty._id}>
                                    <td>{faculty.regNo}</td>
                                    <td>
                                        <p>{faculty.name}</p>
                                    </td>
                                    <td>
                                        <span className="status">
                                            {faculty.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="action-all">
                                            <ion-icon
                                                onClick={() =>
                                                    handleView(faculty)
                                                }
                                                name="eye-outline"
                                            ></ion-icon>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="loadMore">
                <button
                    onClick={handleClick}
                    className={`btn-load-more ${
                        currentPage < totalPage ? "" : "disabled"
                    }`}
                >
                    {!loading ? (
                        <>
                            {currentPage < totalPage
                                ? "Load More"
                                : "Thats All !"}
                        </>
                    ) : (
                        "Loading ..."
                    )}
                </button>
            </div>
        </main>
    );
};

export default Faculty;
