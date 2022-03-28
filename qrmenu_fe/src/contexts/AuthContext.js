import React, { createContext, useState } from "react";
import { signIn as signInApi, register as registerApi } from "../apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const signIn = async (username, password, cb) => {
    setLoading(true);
    const response = await signInApi(username, password);
    console.log({ response }, response);
    if (response && response.auth_token) {
      setToken(response.auth_token);
      localStorage.setItem("token", response.auth_token);
      cb();
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const register = async (username, password, cb) => {
    setLoading(true);
    const response = await registerApi(username, password);
    if (response && response.id) {
      cb();
    }
    setLoading(false);
  };

  const value = {
    token,
    loading,
    signIn,
    signOut,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
