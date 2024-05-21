import { jwtDecode } from "jwt-decode";

export const validateToken = (token) => {
  const now = Math.round(new Date().getTime() / 1000);
  const decodedToken = jwtDecode(token);
  const isValid = decodedToken && now < decodedToken.expires;
  console.log(decodedToken);

  return isValid;
};