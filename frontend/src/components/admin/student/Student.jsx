import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethods";

const Student = ({ clickedComponent, setUserData }) => {
    const pageSize = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [students, setStudents] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getStudents = async () => {
            try {
                setLoading(true);
                const res = await userRequest.get(
                    `user?role=Student&page=${currentPage}&limit=${pageSize}`
                );
                setLoading(false);
                setStudents((prev) => [...prev, ...res.data.data]);
                setTotalPage(Math.ceil(res.data.totalResults / pageSize));
            } catch (error) {
                console.log(error);
            }
        };
        getStudents();
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
                    <h1>All Students</h1>
                </div>
            </div>

            <div className="table-data">
                <div className="order">
                    <table>
                        <thead>
                            <tr>
                                <th>Reg No.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.regNo}</td>
                                    <td>
                                        <p>{student.name}</p>
                                    </td>
                                    <td>
                                        <span className="status">
                                            {student.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="action-all">
                                            <ion-icon
                                                onClick={() =>
                                                    handleView(student)
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

export default Student;
