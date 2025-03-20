//authContext.jsx

/*import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};*/

import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; 
import { 
  onAuthStateChanged, 
  signOut, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Force Firebase to store authentication in localStorage
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Firebase authentication persistence set to LOCAL.");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("User detected:", currentUser);
        const userData = {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.log("User is signed out, clearing localStorage...");
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      console.log("Signing out...");
  
      // **1. Clear localStorage first**
      localStorage.removeItem("user");
      setUser(null);
  
      // **2. Sign out from Firebase**
      await signOut(auth);
  
      // **3. Force Firebase session to clear**
      auth.currentUser = null;
  
      // **4. Reload page to prevent auto-login**
      setTimeout(() => {
        window.location.href = "/signin"; // Redirect to SignInPage after logout
      }, 500);
  
      console.log("Logout successful!");
  
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


