import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/userRedux";

const ProfileInfo = ({ me }) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="profile-wrapper">
            <img src={me.profileImg} alt="profile" />
            <div className="info">
                <h2>Hello, {me.name}</h2>
                <h4>Welcome to KIST College Online Notice Board!</h4>
                <p>
                    This is your profile dashboard. You can manage your account
                    here!
                </p>
                {me.isAdmin && (
                    <div className="admin-nav">
                        <p>You are an admin: </p>
                        <Link to="/admin/dashboard">
                            Manage admin dashboard!
                        </Link>
                    </div>
                )}

                <div className="admin-nav">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
