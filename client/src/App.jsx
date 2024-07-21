import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Missing from "./pages/Missing.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Layout from "./components/Layout.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PersonalInfo from "./pages/Profile/PersonalInfo.jsx";
import Billing from "./pages/Profile/Billing.jsx";
import History from "./pages/Profile/History.jsx";
import Notifications from "./pages/Profile/Notifications.jsx";
import Feedback from "./pages/Profile/Feedback.jsx";
import Settings from "./pages/Profile/Settings.jsx";
import Compress from "./pages/Compress.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}

        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>

        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>

            {/* Protected Routes */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={["admin", "moderator", "premium", "user"]}
                /> // REMOVE user
              }
            >
              <Route path="compress" element={<Compress />} />
            </Route>
            {/* Profile */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={["admin", "moderator", "premium", "user"]}
                />
              }
            >
              <Route path="profile" element={<Profile />}>
                <Route index element={<PersonalInfo />} />
                <Route path="info" element={<PersonalInfo />} />
                <Route path="billing" element={<Billing />} />
                <Route path="history" element={<History />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
                <Route path="feedback" element={<Feedback />} />
              </Route>
            </Route>

            {/* Dashboard */}
            <Route
              element={<RequireAuth allowedRoles={["admin", "moderator"]} />}
            >
              <Route path="dashboard" element={<Dashboard />}></Route>
            </Route>

            <Route path="about" element={<About />}></Route>
            <Route path="unauthorized" element={<Unauthorized />}></Route>
            <Route path="blog" element={<Blog />}></Route>
          </Route>
        </Route>
        {/* Catch all */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
