// Importing necessary modules and functions from React and utils
import { createContext, useEffect, useReducer, useRef } from "react";
import axiosInstance from "../services/axios";
import { validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";

// Initial state for the authentication context
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
};

// Creating the authentication context using createContext
export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// Reducer function for handling authentication state changes
const reducer = (state, action) => {
  // Handlers for different action types
  const handlers = {
    // Handler for initializing authentication state
    INITIALIZE: (state, action) => {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
      };
    },
    // Handler for setting authenticated state after login
    LOGIN: (state) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    // Handler for setting authenticated state to false after logout
    LOGOUT: (state) => {
      return {
        ...state,
        isAuthenticated: false,
      };
    },
  };

  // Applying the appropriate handler based on the action type
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

// AuthProvider component for providing authentication context to its children
export const AuthProvider = (props) => {
  const { children } = props;
  // Using useReducer to manage authentication state with the defined reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);
  // useRef to track if the component is mounted
  const isMounted = useRef(false);

  // useEffect to initialize authentication state when the component mounts
  useEffect(() => {
    // Checking if the component is already mounted to prevent unnecessary re-initialization
    if (isMounted.current) return;

    // Function to initialize authentication state
    const initialize = async () => {
      try {
        // Retrieving the access token from local storage
        const accessToken = localStorage.getItem("accessToken");

        // Validating the access token
        if (accessToken && validateToken(accessToken)) {
          // Setting session with the access token
          setSession(accessToken);

          // Dispatching the INITIALIZE action with isAuthenticated set to true
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
            },
          });
        } else {
          // Dispatching the INITIALIZE action with isAuthenticated set to false
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
            },
          });
        }
      } catch (error) {
        // Handling errors during initialization
        console.error(error);
        // Dispatching the INITIALIZE action with isAuthenticated set to false in case of errors
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
          },
        });
      }
    };

    // Calling the initialize function
    initialize();

    // Marking the component as mounted
    isMounted.current = true;
  }, []);

  // Function for user login
  const login = async (email, password) => {
    try {
      // Sending a login request to the server to obtain JWT token
      const response = await axiosInstance.post("/admins/login", {
        email: email,
        password,
      });
      const { access_token } = response.data;

      // Setting the JWT token in session storage
      setSession(access_token);

      // Dispatching the LOGIN action
      dispatch({
        type: "LOGIN",
      });
    } catch (err) {
      // Returning a rejected promise in case of login failure
      return Promise.reject(err);
    }
  };

  // Function for user logout
  const logout = () => {
    // Clearing session storage
    resetSession();
    // Dispatching the LOGOUT action
    dispatch({ type: "LOGOUT" });
  };

  // Providing authentication context value to the children components
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exporting AuthConsumer for consuming authentication context in class components
export const AuthConsumer = AuthContext.Consumer;
