import { useState } from "react";
import "notyf/notyf.min.css";
import { userRequest } from "../../../requestMethods";
import { notyf } from "../../../alert";

const UserView = ({ userData }) => {
    const [status, setStatus] = useState(null);
    const [desc, setDesc] = useState(undefined);
    const [resStatus, setResStatus] = useState(null);
    const handleSubmit = async () => {
        if (!status && !desc) {
            notyf.error("You have'nt changed any thing.");
            return;
        }

        if (desc) {
            try {
                await userRequest.post("/notification", {
                    userId: userData._id,
                    content: desc,
                });
                notyf.success("Notification Added.");
                setDesc(null);
            } catch (error) {
                console.log(error);
            }
        }
        if (status) {
            try {
                const res = await userRequest.patch(`/user/${userData._id}`, {
                    status,
                });
                setResStatus(res.data.data.status);
                setStatus(null);

                notyf.success("Successfully updated status");
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>
                        {userData.role === "Student"
                            ? "Student Information"
                            : "Faculty Information"}
                    </h1>
                </div>
            </div>

            <div className="user-info">
                <div className="info-wrapper">
                    <img src={userData.profileImg} alt="profile" />
                    <div className="info">
                        <p>
                            Name: <span>{userData.name}</span>
                        </p>
                        <p>
                            Email: <span>{userData.email}</span>
                        </p>
                        <p>
                            Reg No: <span>{userData.regNo}</span>
                        </p>
                        <p>
                            Mobile No: <span>{userData.mobile}</span>
                        </p>
                        <p>
                            Gender:{" "}
                            <span>
                                {!userData.gender ? "NA" : userData.gender}
                            </span>
                        </p>
                        <p>
                            Course:{" "}
                            <span>
                                {!userData.course ? "NA" : userData.course}
                            </span>
                        </p>
                        <p>
                            Branch:
                            <span>
                                {!userData.branch ? "NA" : userData.branch}
                            </span>
                        </p>
                        <p>
                            Semester:
                            <span>
                                {!userData.semester ? "NA" : userData.semester}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="status-wrapper">
                    <h1>Account Status</h1>
                    <p>
                        This user account is currently{" "}
                        <b> {resStatus ? resStatus : userData.status}</b>.
                    </p>
                    <div className="input-box">
                        <label>Change Account Status</label>
                        <select
                            defaultValue={userData.status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>Message (Optional)</label>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="btn-primary submit-btn"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
};

export default UserView;
