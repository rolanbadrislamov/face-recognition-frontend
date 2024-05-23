// Importing necessary modules and hooks from Chakra UI, React, and react-router-dom
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

// NavBar component for navigation and user authentication
export const NavBar = () => {
  // Destructuring logout function from useAuth hook
  const { logout } = useAuth();

  // JSX structure for navigation bar
  return (
    <Box minHeight="100vh">
      {/* Navigation bar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        // Setting background color based on color mode
        bg={useColorModeValue("green.300", "green.600")}
        color="white"
      >
        {/* Title of the application */}
        <Text as="h2" fontSize={24} fontWeight="bold">
          FACE RECOGNITION
        </Text>
        {/* Stack for theme toggler and logout button */}
        <Stack direction="row" align="center" spacing={4}>
          {/* Theme toggler component */}
          <ThemeToggler size="lg" />
          {/* Logout button */}
          <Button onClick={logout} colorScheme="green">
            Logout
          </Button>
        </Stack>
      </Flex>
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </Box>
  );
};
