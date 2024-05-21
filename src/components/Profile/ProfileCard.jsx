// Importing necessary modules and hooks from React, Chakra UI, axios, and react-router-dom
import React, { useEffect, useState } from "react";
import {
  Badge,
  Flex,
  Spinner,
  Text,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import { useParams, useLocation } from "react-router-dom";

// ProfileCard component for displaying user profile data
export const ProfileCard = () => {
  // State variables to store profile data, loading state, error state, user photo, and toast instance
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const toast = useToast(); // Initializing useToast hook
  // Background color based on color mode
  const background = useColorModeValue("gray.300", "gray.600");
  // useParams hook to access URL parameters
  const { profileID } = useParams();
  // useLocation hook to access the current location
  const location = useLocation();

  // useEffect hook to fetch profile data and photo when component mounts or profileID/location.state changes
  useEffect(() => {
    const state = location.state;
    if (state && state.profileData) {
      setProfileData(state.profileData);
      fetchPhoto(state.profileData.id);
    } else if (typeof profileID === "string") {
      fetchProfile(profileID);
      fetchPhoto(profileID);
    }
  }, [profileID, location.state]);

  // Function to fetch profile data from the server
  const fetchProfile = (id) => {
    setLoading(true); // Set loading state to true
    // Fetch profile data from the API
    axiosInstance
      .get(`/profiles/profile/${id}`)
      .then((res) => {
        setProfileData(res.data); // Set profile data
        fetchPhoto(res.data.photo_id); // Fetch user photo
      })
      .catch((error) => {
        console.error(error);
        setError(error); // Set error state
        // Display error message using toast
        toast({
          title: "Failed to load profile data",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  // Function to fetch user photo from the server
  const fetchPhoto = (photoId) => {
    if (!photoId) return;
    // Fetch user photo from the API
    axiosInstance
      .get(`/profiles/profile-photo/${photoId}`, { responseType: "blob" })
      .then((res) => {
        if (res.headers["content-type"] === "image/jpeg") {
          setPhoto(URL.createObjectURL(res.data)); // Set user photo
        } else {
          console.error("Invalid photo format");
          // Display error message using toast
          toast({
            title: "Failed to load user's photo",
            status: "error",
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // Display error message using toast
        toast({
          title: "Failed to load user's photo",
          status: "error",
          isClosable: true,
        });
      });
  };

  // If loading, display a spinner
  if (loading) {
    return (
      <Flex justify="center" align="center" height="400px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="blue.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  // If error, display an error message
  if (error) {
    return (
      <Flex justify="center" align="center" height="400px">
        <Text color="red.500">Error loading profile data.</Text>
      </Flex>
    );
  }

  // If no profile data, return null
  if (!profileData) {
    return null;
  }

  // Render profile data and user photo
  return (
    <Flex justify="center">
      {" "}
      {/* Wrapping with a flex container */}
      <Flex
        direction="column"
        bg={background}
        width="600px"
        height="auto"
        my={3}
        p={6}
        rounded="lg"
        justifyContent="center"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={3}>
          Profile Data
        </Text>
        {/* Displaying profile data */}
        <Text>
          <strong>First Name:</strong> {profileData.first_name}
        </Text>
        <Text>
          <strong>Last Name:</strong> {profileData.last_name}
        </Text>
        <Text>
          <strong>Age:</strong> {profileData.age}
        </Text>
        <Text>
          <strong>Phone Number:</strong> {profileData.phone_number}
        </Text>
        <Text>
          <strong>Email:</strong> {profileData.email}
        </Text>
        <Text>
          <strong>Created At:</strong>{" "}
          {new Date(profileData.created_at).toLocaleString()}
        </Text>
        <Text>
          <strong>Updated At:</strong>{" "}
          {new Date(profileData.updated_at).toLocaleString()}
        </Text>
        {/* Display user photo if available */}
        {photo && <Image src={photo} alt="User's Photo" mt={3} />}
        {/* Displaying user ID */}
        <Badge mt={3} colorScheme="blue">
          ID: {profileData.id}
        </Badge>
      </Flex>
    </Flex>
  );
};
