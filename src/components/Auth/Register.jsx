// Importing necessary modules and hooks from Chakra UI, React, react-hook-form, react-router-dom, and Axios
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
import axiosInstance from "../../services/axios";
import { ThemeToggler } from "../Theme/ThemeToggler";

// Register component for user registration
export const Register = () => {
  // Destructuring necessary methods and states from useForm hook
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  // Navigation hook for redirecting users
  const navigate = useNavigate();
  // Toast hook for displaying messages to the user
  const toast = useToast();

  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      // Sending a POST request to register a new user
      await axiosInstance.post("/admins/register", values);
      // Displaying a success message if registration is successful
      toast({
        title: "Account created successfully.",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      // Redirecting to the login page after successful registration
      navigate("/login", { replace: true });
    } catch (err) {
      // Displaying an error message if registration fails
      toast({
        title: `${err.response.data.detail}`,
        status: "error",
        isCloseable: true,
        duration: 1500,
      });
    }
  };

  // JSX structure for the registration form and related components
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
        {/* Heading for the registration form */}
        <Heading mb={6}>Register</Heading>
        {/* Form for user registration */}
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
          {/* Input field for username */}
          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="username"
              // Setting background color based on color mode
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              variant="filled"
              size="lg"
              mt={6}
              // Registering username field with useForm hook and adding validation rules
              {...register("username", {
                required: "This filed is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Username must be at most 24 characters",
                },
              })}
            />
            {/* Error message for username validation */}
            <FormErrorMessage>
              {errors.username && errors.username.message}
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
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Password must be at most 24 characters",
                },
              })}
            />
            {/* Error message for password validation */}
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          {/* Button for submitting the registration form */}
          <Button
            isLoading={isSubmitting}
            loadingText="Creating account..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Register
          </Button>
        </form>
        {/* Theme toggler component */}
        <ThemeToggler showLabel={true} />
        {/* Button for redirecting to the login page */}
        <Button
          onClick={() => navigate("/login", { replace: true })}
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
        >
          Login Instead
        </Button>
      </Flex>
    </Flex>
  );
};
