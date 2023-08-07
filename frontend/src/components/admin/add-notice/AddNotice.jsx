import { useState } from "react";
import { userRequest } from "../../../requestMethods";
import { notyf } from "../../../alert.js";

const AddNotice = () => {
    const [inputs, setInputs] = useState({});
    const [refId, setRefId] = useState("");
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleNoticeImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFileData(file);
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFile(reader.result);
            };
        } else {
            setFile("");
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (JSON.stringify(inputs) === "{}") {
            notyf.error("Please enter inputs!");
            return;
        }
        if (!refId) {
            notyf.error("Please enter reference Id!");
            return;
        }
        if (!file) {
            notyf.error("Please upload image!");
            return;
        }
        setLoading(true);
        let savedNotice;
        try {
            savedNotice = await userRequest.post("/notice", {
                image: file,
                refId,
                ...inputs,
            });

            notyf.success("Notice uploaded successfully!");
            setFile("");
        } catch (error) {
            notyf.success("Something went wrong try again!");
        }
        setLoading(false);
        // this try catch is for email sending
        try {
            await userRequest.post(
                "/email/send-notice-email",
                savedNotice.data.data
            );
            console.log("email sent!");
        } catch (error) {
            console.log("Email Error: ", error);
        }
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Add New Notice</h1>
                </div>
            </div>

            <div className="form">
                <div className="image-box">
                    <label>
                        Notice Image <span>*</span>
                    </label>
                    <div className="image-input">
                        <img src={file ? file : ""} alt="" />
                        <label className="upload-box" htmlFor="notice-image">
                            <ion-icon name="camera-reverse-outline"></ion-icon>
                        </label>
                        <input
                            id="notice-image"
                            name="imageUrl"
                            style={{ display: "none" }}
                            type="file"
                            placeholder="Upload Image"
                            required
                            onChange={handleNoticeImageUpload}
                        />
                    </div>
                </div>

                <div className="title-box">
                    <label>
                        Notice Title <span>*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter notice title"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="title-box">
                    <label>
                        Reference Id <span>*</span>
                    </label>
                    <input
                        type="text"
                        name="refId"
                        placeholder="Enter notice Reference Id"
                        required
                        onChange={(e) => setRefId(e.target.value)}
                    />
                </div>

                <div className="desc-box">
                    <label>Notice Description</label>
                    <textarea
                        onChange={handleChange}
                        name="description"
                        placeholder="Enter notice description"
                    ></textarea>
                </div>

                {!loading ? (
                    <button
                        onClick={handleClick}
                        className="btn-primary submit_btn"
                    >
                        Submit
                    </button>
                ) : (
                    <button className="btn-primary submit_btn">
                        Adding ...
                    </button>
                )}
            </div>
        </main>
    );
};

export default AddNotice;
