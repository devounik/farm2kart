import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (!currentUser)
    return (
      <Navigate
        to="/login"
        replace
      />
    );

  return children;
}
