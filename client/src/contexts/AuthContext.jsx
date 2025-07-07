import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import instance from "../api/index";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          const token = await getIdToken(user);

          const response = await instance.post(
            "http://localhost:5000/api/auth/sync",
            { idToken: token }
          );

          setMongoUser(response.data);
        } catch (err) {
          console.error("Error syncing user:", err);
        }
      } else {
        setMongoUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, mongoUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
