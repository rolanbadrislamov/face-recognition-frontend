import { createContext, useEffect, useReducer, useRef } from "react";
import axiosInstance from "../services/axios";
import { validateToken } from "../utils/jwt";
import { resetSession, setSession } from "../utils/session";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
};

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
    };
  },
  LOGIN: (state) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  },
  LOGOUT: (state) => {
    return {
      ...state,
      isAuthenticated: false,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
          },
        });
      }
    };
    initialize();
    isMounted.current = true;
  }, []);

  const login = async (email, password) => {
    try {
      // Fetch the JWT token
      const response = await axiosInstance.post("/admins/login", {
        email: email,
        password,
      });
      const { access_token } = response.data;

      // Set the JWT token in session storage
      setSession(access_token);

      // Dispatch LOGIN action
      dispatch({
        type: "LOGIN",
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const logout = () => {
    resetSession();
    dispatch({ type: "LOGOUT" });
  };

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

export const AuthConsumer = AuthContext.Consumer;
