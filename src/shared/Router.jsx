import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import TestResultPage from "../pages/TestResultPage";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/profile" />;
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const SharedRouter = () => {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<PublicRoute element={Signup} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/testpage" element={<PrivateRoute element={TestPage} />} />
        <Route
          path="/testresultpage"
          element={<PrivateRoute element={TestResultPage} />}
        />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default SharedRouter;
