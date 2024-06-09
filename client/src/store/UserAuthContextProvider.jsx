import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
//   FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [timerID,setTimerID] = useState(null);
  // const navigate=useNavigate();

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
//   function facebookSignIn() {
//     const facebookAuthProvider = new FacebookAuthProvider();
//     return signInWithPopup(auth, facebookAuthProvider);
//   }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
      if(currentuser){
        startLogoutTimer();
      }
      else{
        clearTimeout(timerID);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const startLogoutTimer = () => {
    clearTimeout(timerID);
    const newTimerId = setTimeout(() => {
      logOut();
    }, 3600000);
    setTimerID(newTimerId);
  };

  const resetLogoutTimer = () => {
    startLogoutTimer();
  };

  return (
    <UserAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn,resetLogoutTimer }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
