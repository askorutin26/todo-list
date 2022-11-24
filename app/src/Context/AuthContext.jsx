import React, { useState, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { firebaseApp } from "../firebase.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";

const AuthContext = createContext({});
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const isLogged = () => !!localStorage.getItem("userID");
  const navigate = useNavigate();
  const [logged, setLogged] = useState(isLogged);

  const localUID = localStorage.getItem("userID");
  const [userID, setUserID] = useState(localUID);

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const uid = result.user.uid;
      if (uid) {
        localStorage.setItem("userID", result.user.uid);
        setLogged(true);
        setUserID(uid);
        navigate("/");
      }
    });
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userID");
      setLogged(false);
      setUserID("");
    });
  };

  const props = { logged, setLogged, signIn, signUserOut, userID, setUserID };
  return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>;
}
export { AuthProvider };
export { AuthContext };
