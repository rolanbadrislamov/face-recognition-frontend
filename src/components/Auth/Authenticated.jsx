import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Authenticated component ensures that children components are only rendered if the user is authenticated
export const Authenticated = (props) => {
  // Destructure children from props
  const { children } = props;
  // Get authentication status from useAuth hook
  const auth = useAuth();
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();
  // useLocation hook to get the current location object
  const location = useLocation();
  // Local state to track if the authentication has been verified
  const [isVerified, setIsVerified] = useState(false);

  // useEffect to run side effects when dependencies change
  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!auth.isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
    } else {
      // If authenticated, set isVerified to true
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, navigate]); // Dependencies array to re-run the effect when these change

  // If not verified, return null to prevent rendering children
  if (!isVerified) {
    return null;
  }
  // Render children components if authenticated
  return <>{children}</>;
};
