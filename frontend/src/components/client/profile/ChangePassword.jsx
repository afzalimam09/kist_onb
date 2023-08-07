import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notyf } from "../../../alert";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../../redux/apiCalls";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (passwordData) => {
        if (JSON.stringify(passwordData) === "{}") {
            notyf.error("Please change something before click!");
            return;
        }
        setLoading(true);
        const res = await updatePassword(dispatch, passwordData);
        setLoading(false);
        if (res.status === "success") {
            notyf.success("Successfully updated password");
            passwordData = null;
        } else if (res.status === "fail") {
            setErr(res.message);
            notyf.error(res.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="change-profile">
            <h2>Change Password</h2>
            <div className="input-boxes">
                <div className="input-box">
                    <label>Current Password</label>
                    <input
                        name="passwordCurrent"
                        type="password"
                        {...register("passwordCurrent", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors?.passwordCurrent?.type === "required" && (
                        <p>This field is required</p>
                    )}
                    {errors?.passwordCurrent?.type === "minLength" && (
                        <p>Your password is atleast 8 character long</p>
                    )}
                </div>
                <div className="input-box">
                    <label>New Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors?.password?.type === "required" && (
                        <p>This field is required</p>
                    )}
                    {errors?.password?.type === "minLength" && (
                        <p>Password should be atleast 8 character long</p>
                    )}
                </div>
                <div className="input-box">
                    <label>New Password Again</label>
                    <input
                        name="passwordConfirm"
                        type="password"
                        {...register("passwordConfirm", {
                            required: true,
                            validate: (val) => {
                                if (watch("password") !== val) {
                                    return false;
                                }
                            },
                        })}
                    />
                    {errors?.passwordConfirm?.type === "required" && (
                        <p>This field is required</p>
                    )}
                    {errors?.passwordConfirm?.type === "validate" && (
                        <p>Password Don't Match</p>
                    )}
                </div>
            </div>
            {err && (
                <p
                    style={{
                        color: "red",
                        marginBottom: "5px",
                        marginTop: "0",
                    }}
                >
                    {err}
                </p>
            )}
            {!loading ? (
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            ) : (
                <button disabled className="btn btn-primary">
                    Saving...
                </button>
            )}
        </form>
    );
};

export default ChangePassword;
