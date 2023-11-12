// src/context/UserContext.js
import React, { createContext, useContext } from "react";
import { fakeAuthProvider } from "../auth";
export const useAuth = () => useContext(AuthContext);

function setIsAuthenticatedToLocalStorage() {
  localStorage.setItem("isAuthenticated", true);
}

function removeIsAuthenticatedToLocalStorage() {
  localStorage.setItem("isAuthenticated", false);
}

function getIsAuthenticatedFromLocalStorage() {
  return localStorage.getItem("isAuthenticated");
}

let AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let signin = ({ username, password }, callback) => {
    return fakeAuthProvider.signin(() => {
      setIsAuthenticatedToLocalStorage();
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      removeIsAuthenticatedToLocalStorage();
      callback();
    });
  };
  let isAuthenticated = getIsAuthenticatedFromLocalStorage();
  let value = { isAuthenticated, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
