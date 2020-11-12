import React, { useContext, useState, useEffect } from "react";
import storage from "./../../utils/storage";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    let user = storage.getItem("user");
    setCurrentUser(user ? JSON.parse(user) : {} || {});
  }, []);

  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{currentUser && children}</AuthContext.Provider>;
}
