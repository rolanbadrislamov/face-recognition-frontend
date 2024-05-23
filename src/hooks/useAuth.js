// Importing useContext hook from React
import { useContext } from "react";

// Importing AuthContext from the JWTAuthContext module
import { AuthContext } from "../context/JWTAuthContext";

// Custom hook for accessing authentication context
export const useAuth = () => {
  // Using useContext hook to access the authentication context
  // AuthContext here refers to the context created in JWTAuthContext module
  // This hook returns the current context value provided by AuthProvider in JWTAuthContext
  return useContext(AuthContext);
};
