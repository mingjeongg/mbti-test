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

// children을 그리겠다.
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return !isAuthenticated ? children : <Navigate to="/profile" />;
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};
// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
// };

const SharedRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/testpage"
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/testresultpage"
            element={
              <PrivateRoute>
                <TestResultPage />
              </PrivateRoute>
            }
          />
        </Routes>{" "}
      </Layout>
    </BrowserRouter>
  );
};

export default SharedRouter;
