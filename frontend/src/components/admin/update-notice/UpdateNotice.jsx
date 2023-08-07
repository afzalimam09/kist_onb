import { useState } from "react";
import { notyf } from "../../../alert";
import { userRequest } from "../../../requestMethods";

const UpdateNotice = ({ noticeData }) => {
    const [inputs, setInputs] = useState({});
    const [refId, setRefId] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatedNotice, setUpdatedNotice] = useState(undefined);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleNoticeImageUpdate = (e) => {
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!file && !refId && JSON.stringify(inputs) === "{}") {
            notyf.error("No changes found!");
            return;
        }
        setLoading(true);
        let res;
        try {
            res = await userRequest.patch(`/notice/${noticeData._id}`, {
                image: file,
                refId: refId ? refId : noticeData.refId,
                ...inputs,
            });
            setUpdatedNotice(res.data.data);
            notyf.success("Notice updated successfully!");
            setFile("");
            setRefId("");
            setInputs({});
        } catch (error) {
            notyf.success("Something went wrong. try again!");
        }
        setLoading(false);
        try {
            await userRequest.post("/email/send-notice-email", res.data.data);
            console.log("email sent!");
        } catch (error) {
            console.log("Email Error: ", error);
        }
    };

    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Update Notice</h1>
                </div>
            </div>

            <div className="form">
                <div className="image-box">
                    <label>Notice Image</label>
                    <div className="image-input">
                        <img
                            src={
                                file
                                    ? file
                                    : updatedNotice
                                    ? updatedNotice.imageUrl
                                    : noticeData.imageUrl
                            }
                            alt=""
                        />
                        <label className="upload-box" htmlFor="notice-image">
                            <ion-icon name="camera-reverse-outline"></ion-icon>
                        </label>
                        <input
                            id="notice-image"
                            type="file"
                            name="imageUrl"
                            style={{ display: "none" }}
                            onChange={handleNoticeImageUpdate}
                        />
                    </div>
                </div>

                <div className="title-box">
                    <label>Notice Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        defaultValue={
                            updatedNotice
                                ? updatedNotice.title
                                : noticeData.title
                        }
                    />
                </div>
                <div className="title-box">
                    <label>Notice Reference Id</label>
                    <input
                        type="text"
                        name="refId"
                        defaultValue={
                            updatedNotice
                                ? updatedNotice.refId
                                : noticeData.refId
                        }
                        onChange={(e) => setRefId(e.target.value)}
                    />
                </div>

                <div className="desc-box">
                    <label>Notice Description</label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        defaultValue={
                            updatedNotice
                                ? updatedNotice.description
                                : noticeData.description
                        }
                    ></textarea>
                </div>

                {!loading ? (
                    <button
                        onClick={handleUpdate}
                        className="btn-primary submit_btn"
                    >
                        Update
                    </button>
                ) : (
                    <button className="btn-primary submit_btn">
                        Updating ...
                    </button>
                )}
            </div>
        </main>
    );
};

export default UpdateNotice;
