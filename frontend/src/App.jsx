import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Home from "./pages/client/home/Home";
import Login from "./pages/client/login/Login";
import Register from "./pages/client/register/Register";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Profile from "./pages/client/profile/Profile";
import Bookmark from "./pages/client/bookmark/Bookmark";
import Notification from "./pages/client/notifications/Notification";
import ViewNotice from "./pages/client/view-notice/ViewNotice";
import PageNotFound from "./pages/client/404/PageNotFound.jsx";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    let admin;
    if (user) {
        admin = user.data.isAdmin;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="bookmark" element={<Bookmark />} />
                    <Route
                        path="login"
                        element={user ? <Navigate to="/" /> : <Login />}
                    />
                    <Route
                        path="register"
                        element={user ? <Navigate to="/" /> : <Register />}
                    />
                    <Route
                        path="profile"
                        element={!user ? <Navigate to="/login" /> : <Profile />}
                    />
                    <Route
                        path="notification"
                        element={
                            !user ? <Navigate to="/login" /> : <Notification />
                        }
                    />
                </Route>
                <Route path="/notice/:noticeId" element={<ViewNotice />} />
                <Route path="/admin/">
                    <Route
                        path="dashboard"
                        element={!admin ? <Navigate to="/" /> : <Dashboard />}
                    />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
