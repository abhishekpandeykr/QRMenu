import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Places from "../pages/Places";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/places" element={<Places />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
