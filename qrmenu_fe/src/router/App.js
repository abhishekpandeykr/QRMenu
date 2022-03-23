import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";

import Home from "../pages/Home";
import Login from "../pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
