import { jwtDecode } from "jwt-decode";

export const validateToken = (token) => {
    try {
        const now = Math.round(new Date().getTime() / 1000);
        const decodedToken = jwt_decode(token);
        const isValid = decodedToken && now < decodedToken.exp;
        return isValid;
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
}