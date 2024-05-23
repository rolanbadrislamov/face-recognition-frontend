// Importing necessary components and hooks from libraries and local files
import { Flex, Spinner } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Authenticated } from "./components/Auth/Authenticated";
import { Login } from "./components/Auth/Login";
import { PublicRoute } from "./components/Auth/PublicRoute";
import { Register } from "./components/Auth/Register";
import { AuthConsumer, AuthProvider } from "./context/JWTAuthContext";
import { NavBar } from "./components/Navbar/NavBar";
import { PhotoInput } from "./components/Camera/PhotoInput";
import { ProfileCard } from "./components/Profile/ProfileCard";

function App() {
  return (
    <>
      {/* Wrapping the application with AuthProvider to manage authentication */}
      <AuthProvider>
        {/* Setting up React Router for routing */}
        <Router>
          {/* Consuming the authentication context */}
          <AuthConsumer>
            {(auth) =>
              // Conditionally rendering based on authentication initialization status
              !auth.isInitialized ? (
                // Displaying a spinner if authentication is not initialized yet
                <Flex
                  height="100vh"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="green.200"
                    color="green.500"
                    size="xl"
                  />
                </Flex>
              ) : (
                // Rendering routes once authentication is initialized
                <Routes>
                  {/* Route for login page */}
                  <Route
                    path="/login"
                    element={
                      // Wrapping Login component with PublicRoute for unauthenticated access
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  {/* Route for register page */}
                  <Route
                    path="/register"
                    element={
                      // Wrapping Register component with PublicRoute for unauthenticated access
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  {/* Route for authenticated user pages */}
                  <Route path="/" element={<NavBar />}>
                    {/* Nested routes for authenticated user pages */}
                    <Route
                      path="/"
                      element={
                        // Wrapping PhotoInput component with Authenticated for authenticated access
                        <Authenticated>
                          <PhotoInput />
                        </Authenticated>
                      }
                    />
                    <Route
                      path="/:profileID"
                      element={
                        // Wrapping ProfileCard component with Authenticated for authenticated access
                        <Authenticated>
                          <ProfileCard />
                        </Authenticated>
                      }
                    />
                  </Route>
                  {/* Catch-all route for unknown paths */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              )
            }
          </AuthConsumer>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
