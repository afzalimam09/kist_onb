import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notyf } from "../../../alert";
import { updateSuccess } from "../../../redux/userRedux";
import { userRequest } from "../../../requestMethods";

const ChangeProfile = ({ me }) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({});
    const [regNo, setRegNo] = useState("");
    const [userImage, setUserImage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleUserImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFileData(file);
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setUserImage(reader.result);
            };
        } else {
            setUserImage("");
        }
    };

    const handleUpdate = async () => {
        if (JSON.stringify(inputs) === "{}" && !userImage) {
            notyf.error("Please change something before click!");
            return;
        }
        setLoading(true);
        try {
            const res = await userRequest.patch("/user/update-me", {
                image: userImage,
                regNo: regNo ? regNo : me.regNo,
                role: me.role,
                ...inputs,
            });
            dispatch(updateSuccess(res.data.data));
            notyf.success("Successfully Updated!");
        } catch (error) {
            console.log(error);
            notyf.error("Something went wrong. Try Again!");
        }
        setLoading(false);
    };

    return (
        <div className="change-profile">
            <h2>Profile Information</h2>
            <div className="input-boxes">
                <div className="input-box">
                    <label>Name</label>
                    <input
                        name="name"
                        onChange={handleChange}
                        type="text"
                        defaultValue={me.name}
                    />
                </div>
                <div className="input-box">
                    <label>Email</label>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        defaultValue={me.email}
                    />
                </div>
                <div className="input-box">
                    <label>Mobile</label>
                    <input
                        name="mobile"
                        onChange={handleChange}
                        type="number"
                        defaultValue={me.mobile}
                    />
                </div>
                <div className="input-box">
                    <label>Reg No.</label>
                    <input
                        name="regNo"
                        onChange={(e) => setRegNo(e.target.value)}
                        type="number"
                        defaultValue={me.regNo}
                    />
                </div>
                <div className="input-box">
                    <label>Gender</label>
                    <select
                        name="gender"
                        defaultValue={me.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="input-box">
                    <label>Course</label>
                    <select
                        name="course"
                        defaultValue={me.course}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="B-Tech">B-Tech</option>
                        <option value="M-Tech">M-Tech</option>
                        <option value="IMBA">IMBA</option>
                        <option value="MBA">MBA</option>
                    </select>
                </div>
                <div className="input-box">
                    <label>Branch (For B-Tech and M-Tech Only)</label>
                    <select
                        name="branch"
                        defaultValue={me.branch}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="CSE">CSE</option>
                        <option value="Mech">Mech</option>
                        <option value="Civil">Civil</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Electronics">Electronics</option>
                    </select>
                </div>
                <div className="input-box">
                    <label>Semester</label>
                    <select
                        name="semester"
                        defaultValue={me.semester}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                    </select>
                </div>
                <div className="input-box">
                    <label>Profile Photo</label>
                    <div className="uploadProfile">
                        <img
                            src={userImage ? userImage : me.profileImg}
                            alt=""
                        />
                        <label htmlFor="profileImage">
                            <ion-icon name="pencil"></ion-icon>
                        </label>
                        <input
                            name="profileImage"
                            id="profileImage"
                            onChange={handleUserImageUpload}
                            style={{ display: "none" }}
                            type="file"
                        />
                    </div>
                </div>
            </div>
            {!loading ? (
                <button onClick={handleUpdate} className="btn btn-primary">
                    Save Changes
                </button>
            ) : (
                <button className="btn btn-primary">Saving...</button>
            )}
        </div>
    );
};

export default ChangeProfile;
