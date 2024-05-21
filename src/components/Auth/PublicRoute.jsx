// Importing necessary modules and hooks from React and react-router-dom
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Component for rendering public routes
export const PublicRoute = (props) => {
  // Destructuring children from props
  const { children } = props;
  // Getting authentication status using useAuth hook
  const auth = useAuth();
  // Hook for programmatically navigating to different routes
  const navigate = useNavigate();
  // Hook for accessing the current location object
  const location = useLocation();
  // State variable to track if authentication is verified
  const [isVerified, setIsVerified] = useState(false);

  // useEffect hook to perform side effects
  useEffect(() => {
    // If user is authenticated, redirect to home page
    if (auth.isAuthenticated) {
      navigate("/", { replace: true, state: { from: location } });
    } else {
      // If user is not authenticated, set isVerified to true
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]); // Dependencies array to re-run the effect when these change

  // If authentication is not verified, return null to prevent rendering children
  if (!isVerified) {
    return null;
  }
  // Otherwise, render the children components
  return <>{children}</>;
};
