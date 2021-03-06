import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Places from "../pages/Places";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import { Place } from "../pages/Place";
import Menu from "../pages/Menu";
import Orders from "../pages/Orders";
import MenuSettings from "../pages/MenuSettings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu/:id/:table" element={<Menu />} />
          <Route element={<PrivateRoute />}>
            <Route path="/places" element={<Places />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/places/:id" element={<Place />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/places/:id/orders" element={<Orders />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/places/:id/settings" element={<MenuSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
