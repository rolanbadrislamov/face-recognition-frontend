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

export const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");
  const { profileID } = useParams();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (state && state.profileData) {
      setProfileData(state.profileData);
      fetchPhoto(state.profileData.id);
    } else if (typeof profileID === 'string') {
      fetchProfile(profileID);
      fetchPhoto(profileID);
    }
  }, [profileID, location.state]);
  

  const fetchProfile = (id) => {
    setLoading(true);
    axiosInstance
      .get(`/profiles/profile/${id}`)
      .then((res) => {
        setProfileData(res.data);
        fetchPhoto(res.data.photo_id);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        toast({
          title: "Failed to load profile data",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPhoto = (photoId) => {
    if (!photoId) return;
    axiosInstance
      .get(`/profiles/profile-photo/${photoId}`, { responseType: 'blob' })
      .then((res) => {
        if (res.headers['content-type'] === 'image/jpeg') {
          setPhoto(URL.createObjectURL(res.data));
        } else {
          console.error("Invalid photo format");
          toast({
            title: "Failed to load user's photo",
            status: "error",
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Failed to load user's photo",
          status: "error",
          isClosable: true,
        });
      });
  };

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

  if (error) {
    return (
      <Flex justify="center" align="center" height="400px">
        <Text color="red.500">Error loading profile data.</Text>
      </Flex>
    );
  }

  if (!profileData) {
    return null;
  }

  return (
    <Flex justify="center"> {/* Wrapping with a flex container */}
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
        <Text fontSize="2xl" fontWeight="bold" mb={3}>Profile Data</Text>
        <Text><strong>First Name:</strong> {profileData.first_name}</Text>
        <Text><strong>Last Name:</strong> {profileData.last_name}</Text>
        <Text><strong>Age:</strong> {profileData.age}</Text>
        <Text><strong>Phone Number:</strong> {profileData.phone_number}</Text>
        <Text><strong>Email:</strong> {profileData.email}</Text>
        <Text><strong>Created At:</strong> {new Date(profileData.created_at).toLocaleString()}</Text>
        <Text><strong>Updated At:</strong> {new Date(profileData.updated_at).toLocaleString()}</Text>
        {photo && <Image src={photo} alt="User's Photo" mt={3} />}
        <Badge mt={3} colorScheme="blue">
          ID: {profileData.id}
        </Badge>
      </Flex>
    </Flex>
  );
};
