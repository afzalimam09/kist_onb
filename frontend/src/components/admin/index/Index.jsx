import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notyf } from "../../../alert";
import { userRequest } from "../../../requestMethods";

const Index = ({ clickedComponent, setUserData }) => {
    const navigate = useNavigate();

    const [output, setOutput] = useState({
        notices: {},
        students: {},
        faculties: {},
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const [res1, res2, res3] = await Promise.all([
                    userRequest.get(`/notice?page=1&limit=5`),
                    userRequest.get(`/user?role=Student&page=1&limit=5`),
                    userRequest.get(`/user?role=Faculty&page=1&limit=5`),
                ]);
                setOutput({
                    notices: res1.data,
                    students: res2.data,
                    faculties: res3.data,
                });
            } catch (error) {
                notyf.error("Something went wrong!");
                console.log(error);
            }
            setLoading(false);
        };
        getData();
    }, []);

    const handleView = (student) => {
        clickedComponent("UserView");
        setUserData(student);
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
                <button
                    onClick={() => clickedComponent("AddNotice")}
                    className="btn-download"
                >
                    <i className="bx bx-plus"></i>
                    <span className="text">Add New Notice</span>
                </button>
            </div>
            {!loading ? (
                <>
                    <ul className="box-info">
                        <li>
                            <i className="bx bxs-calendar-check"></i>
                            <span className="text">
                                <h3>{output.notices.totalResults}</h3>
                                <p>Total Notices</p>
                            </span>
                        </li>
                        <li>
                            <i className="bx bxs-group"></i>
                            <span className="text">
                                <h3>{output.faculties.totalResults}</h3>
                                <p>Total Faculties</p>
                            </span>
                        </li>
                        <li>
                            <i className="bx bxs-group"></i>
                            <span className="text">
                                <h3>{output.students.totalResults}</h3>
                                <p>Total Students</p>
                            </span>
                        </li>
                    </ul>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Recent Notices</h3>
                                <button
                                    onClick={() => clickedComponent("Notice")}
                                    className="btn-view-all"
                                >
                                    View All
                                </button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Published Date</th>
                                        <th>Title</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {output.notices.data?.map((notice) => (
                                        <tr key={notice._id}>
                                            <td>
                                                {dateFormat(
                                                    notice.createdAt,
                                                    "d mmm, yyyy"
                                                )}
                                            </td>
                                            <td>
                                                <p>{notice.title}</p>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/notice/${notice._id}`
                                                        )
                                                    }
                                                    className="action"
                                                >
                                                    <span>View</span>
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>New Students</h3>
                                <button
                                    onClick={() => clickedComponent("Student")}
                                    className="btn-view-all"
                                >
                                    View All
                                </button>
                            </div>
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
                                    {output.students.data?.map((student) => (
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
                                                <button
                                                    onClick={() =>
                                                        handleView(student)
                                                    }
                                                    className="action"
                                                >
                                                    <span>View</span>
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>New Faculties</h3>
                                <button
                                    onClick={() => clickedComponent("Faculty")}
                                    className="btn-view-all"
                                >
                                    View All
                                </button>
                            </div>
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
                                    {output.faculties.data?.map((faculty) => (
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
                                                <button
                                                    onClick={() =>
                                                        handleView(faculty)
                                                    }
                                                    className="action"
                                                >
                                                    <span>View</span>
                                                    <ion-icon name="eye-outline"></ion-icon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <div className="loadingio-spinner-reload-v7tjwrc1j6">
                        <div className="ldio-jwms0hkh9jg">
                            <div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Index;
