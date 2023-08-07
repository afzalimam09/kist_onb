import { publicRequest, userRequest } from "../requestMethods";
import {
    getNoticeFailure,
    getNoticeStart,
    getNoticeSuccess,
} from "./noticeRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/signin", user);
        dispatch(loginSuccess(res.data));
        return res.data;
    } catch (err) {
        dispatch(loginFailure(err.response.data));
        return err.response.data;
    }
};

export const updatePassword = async (dispatch, passwordData) => {
    dispatch(loginStart());
    try {
        const res = await userRequest.patch(
            "/user/update-my-password",
            passwordData
        );
        dispatch(loginSuccess(res.data));
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const getAllNotices = async (dispatch) => {
    dispatch(getNoticeStart());
    try {
        const res = await userRequest.get(`/notice`);
        console.log(res);
        dispatch(
            getNoticeSuccess({
                items: [...res.data.data],
                count: res.data.totalResults,
            })
        );
    } catch (err) {
        console.log(err);
        dispatch(getNoticeFailure());
    }
};
