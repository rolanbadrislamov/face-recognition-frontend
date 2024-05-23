// Importing necessary components and hooks from Chakra UI, React, and custom hooks
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

// Login component for handling user login
export const Login = () => {
  // Destructuring necessary methods and states from useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  // Navigation hook for redirecting users
  const navigate = useNavigate();
  // Authentication hook for handling user authentication
  const { login } = useAuth();
  // Toast hook for displaying messages to the user
  const toast = useToast();

  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      // Attempt to log in with provided email and password
      await login(values.email, values.password);
    } catch (error) {
      // If login fails, display an error message
      toast({
        title: "Invalid email or password",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  // JSX structure for the login form and related components
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        // Using Chakra UI's color mode value to set background color
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        {/* Heading for the login form */}
        <Heading mb={6}>Login</Heading>
        {/* Form for user input */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input field for email */}
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              // Setting background color based on color mode
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              size="lg"
              mt={6}
              // Registering email field with useForm hook and adding validation rules
              {...register("email", {
                required: "This is required field",
              })}
            />
            {/* Error message for email validation */}
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          {/* Input field for password */}
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Password"
              // Setting background color based on color mode
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              // Registering password field with useForm hook and adding validation rules
              {...register("password", {
                required: "This is required field",
              })}
            />
            {/* Error message for password validation */}
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          {/* Button for submitting the login form */}
          <Button
            isLoading={isSubmitting}
            loadingText="Logging in..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Login
          </Button>
        </form>
        {/* Theme toggler component */}
        <ThemeToggler showLabel={true} />
        {/* Button for redirecting to the registration page */}
        <Button
          onClick={() => navigate("/register", { replace: true })}
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
        >
          Register Instead
        </Button>
      </Flex>
    </Flex>
  );
};
