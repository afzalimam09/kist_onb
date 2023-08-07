import React, { useEffect, useState } from "react";
import Footer from "../../../components/client/footer/Footer";
import Header from "../../../components/client/header/Header";
import BackToTop from "../../../components/shared/backtotop/BackToTop";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requestMethods";
import { notyf } from "../../../alert";
import { useForm } from "react-hook-form";

const Register = () => {
    const [userPhoto, setUserPhoto] = useState("");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleUserImage = (e) => {
        const file = e.target.files[0];
        TransformFileData(file);
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setUserPhoto(reader.result);
            };
        } else {
            setUserPhoto("");
        }
    };

    const onSubmit = async (data) => {
        if (!userPhoto) {
            setFileError(true);
            return;
        }
        const { file, ...inputs } = data;

        setLoading(true);
        try {
            await publicRequest.post("/auth/signup", {
                ...inputs,
                image: userPhoto,
            });
            notyf.success("Registration Successfull!");
            navigate("/login");
        } catch (error) {
            notyf.error("Something went wrong. Try Again");
        }
        setLoading(false);
    };

    return (
        <>
            <Header />
            <section
                className="section register"
                style={{ backgroundImage: "url('/images/newsletter-bg.jpg')" }}
            >
                <div className="container">
                    <div className="form-wrapper">
                        <h3 className="h3 form-title">Student Registeration</h3>
                        <p className="form-text">
                            Create an account if you don't have!
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="form-content"
                        >
                            <div className="input_boxes">
                                <div>
                                    <label>
                                        Full Name <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <ion-icon name="person-circle-outline"></ion-icon>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            className="input-field"
                                            {...register("name", {
                                                required: true,
                                                maxLength: 30,
                                                minLength: 2,
                                                pattern: /^[a-zA-Z ]*$/i,
                                            })}
                                        />
                                    </div>
                                    <div className="valid-err">
                                        {errors?.name?.type === "required" && (
                                            <p>This field is required</p>
                                        )}
                                        {errors?.name?.type === "maxLength" && (
                                            <p>
                                                Name cannot exceed 30 characters
                                            </p>
                                        )}
                                        {errors?.name?.type === "minLength" && (
                                            <p>
                                                Name should be at least 2
                                                characters long
                                            </p>
                                        )}
                                        {errors?.name?.type === "pattern" && (
                                            <p>Alphabetical characters only</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Email <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <ion-icon name="mail-outline"></ion-icon>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your mail address"
                                            className="input-field"
                                            {...register("email", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                    <div className="valid-err">
                                        {errors?.email?.type === "required" && (
                                            <p>This field is required</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Reg No. <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                                        <input
                                            type="number"
                                            name="regNo"
                                            placeholder="Enter your reg no."
                                            className="input-field"
                                            {...register("regNo", {
                                                required: true,
                                                maxLength: 10,
                                                minLength: 10,
                                                pattern: /^[0-9]*$/i,
                                            })}
                                        />
                                    </div>
                                    <div className="valid-err">
                                        {errors?.regNo?.type === "required" && (
                                            <p>This field is required</p>
                                        )}
                                        {errors?.regNo?.type ===
                                            "maxLength" && (
                                            <p>
                                                Reg No cannot exceed 10
                                                characters
                                            </p>
                                        )}
                                        {errors?.regNo?.type ===
                                            "minLength" && (
                                            <p>
                                                Reg No should be at least 10
                                                characters long
                                            </p>
                                        )}
                                        {errors?.regNo?.type === "pattern" && (
                                            <p>Numeric characters only</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Mobile No. <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <ion-icon name="phone-portrait-outline"></ion-icon>
                                        <input
                                            type="number"
                                            name="mobile"
                                            placeholder="Enter your mobile no."
                                            className="input-field"
                                            {...register("mobile", {
                                                required: true,
                                                maxLength: 10,
                                                minLength: 10,
                                                pattern: /^[0-9]*$/i,
                                            })}
                                        />
                                    </div>
                                    <div className="valid-err">
                                        {errors?.mobile?.type ===
                                            "required" && (
                                            <p>This field is required</p>
                                        )}
                                        {errors?.mobile?.type ===
                                            "maxLength" && (
                                            <p>
                                                Mobile No cannot exceed 10
                                                characters
                                            </p>
                                        )}
                                        {errors?.mobile?.type ===
                                            "minLength" && (
                                            <p>
                                                Mobile No should be at least 10
                                                characters long
                                            </p>
                                        )}
                                        {errors?.mobile?.type === "pattern" && (
                                            <p>Numeric characters only</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Password <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <ion-icon name="lock-open-outline"></ion-icon>
                                        <input
                                            type={
                                                !visible ? "password" : "text"
                                            }
                                            name="password"
                                            placeholder="Enter your password"
                                            className="input-field"
                                            {...register("password", {
                                                required: true,
                                                minLength: 8,
                                            })}
                                        />

                                        <div
                                            className="view-password"
                                            onClick={() => setVisible(!visible)}
                                        >
                                            <ion-icon
                                                name={
                                                    !visible
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                            ></ion-icon>
                                        </div>
                                    </div>
                                    <div className="valid-err">
                                        {errors?.password?.type ===
                                            "required" && (
                                            <p>This field is required</p>
                                        )}

                                        {errors?.password?.type ===
                                            "minLength" && (
                                            <p>
                                                Password should be at least 8
                                                characters long
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Confirm Password <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <ion-icon name="lock-open-outline"></ion-icon>
                                        <input
                                            type={
                                                !visible ? "password" : "text"
                                            }
                                            name="passwordConfirm"
                                            placeholder="Confirm password"
                                            className="input-field"
                                            {...register("passwordConfirm", {
                                                required: true,
                                                validate: (val) => {
                                                    if (
                                                        watch("password") !==
                                                        val
                                                    ) {
                                                        return false;
                                                    }
                                                },
                                            })}
                                        />

                                        <div
                                            className="view-password"
                                            onClick={() => setVisible(!visible)}
                                        >
                                            <ion-icon
                                                name={
                                                    !visible
                                                        ? "eye-off-outline"
                                                        : "eye-outline"
                                                }
                                            ></ion-icon>
                                        </div>
                                    </div>
                                    <div className="valid-err">
                                        {errors?.passwordConfirm?.type ===
                                            "required" && (
                                            <p>This field is required</p>
                                        )}
                                        {errors?.passwordConfirm?.type ===
                                            "validate" && (
                                            <p>Password Don't Match</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        User Type <span>*</span>
                                    </label>
                                    <div className="input-wrapper select-box">
                                        <ion-icon name="person-outline"></ion-icon>
                                        <select
                                            className="input-field"
                                            name="role"
                                            id="role"
                                            {...register("role", {
                                                required: true,
                                            })}
                                        >
                                            <option value="">Select</option>
                                            <option value="Student">
                                                Student
                                            </option>
                                            <option value="Faculty">
                                                Faculty
                                            </option>
                                        </select>
                                    </div>
                                    <div className="valid-err">
                                        {errors?.role?.type === "required" && (
                                            <p>This field is required</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Profile Image <span>*</span>
                                    </label>
                                    <div
                                        style={{ padding: "13px" }}
                                        className="input-wrapper"
                                    >
                                        <input
                                            onChange={handleUserImage}
                                            type="file"
                                            name="userImage"
                                        />
                                    </div>
                                    <div className="valid-err">
                                        {fileError && (
                                            <p>This field is required</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!loading ? (
                                <button
                                    type="submit"
                                    className="btn-primary login_btn"
                                >
                                    Register
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={true}
                                    className="btn-primary login_btn"
                                >
                                    Registering...
                                </button>
                            )}
                        </form>

                        <div className="cta">
                            <p>Already have an account?</p>
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <BackToTop />
        </>
    );
};

export default Register;
