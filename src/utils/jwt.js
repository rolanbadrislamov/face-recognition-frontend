// Importing jwtDecode function from jwt-decode library
import { jwtDecode } from "jwt-decode";

// Function to validate JWT token
export const validateToken = (token) => {
  // Getting the current time in seconds
  const now = Math.round(new Date().getTime() / 1000);

  // Decoding the JWT token
  const decodedToken = jwtDecode(token);

  // Checking if the decoded token exists and if the current time is less than the token expiry time
  const isValid = decodedToken && now < decodedToken.expires;

  // Returning a boolean indicating whether the token is valid or not
  return isValid;
};
