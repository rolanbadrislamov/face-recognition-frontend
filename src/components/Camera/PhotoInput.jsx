// Importing necessary modules and hooks from React, Chakra UI, react-router-dom, and Axios
import React, { useRef, useState } from "react";
import {
  Button,
  Flex,
  useColorModeValue,
  Spinner,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import axiosInstance from "../../services/axios";

// Video constraints for webcam
const VideoConstraints = {
  width: 600,
  height: 400,
  facingMode: "user",
};

// PhotoInput component for capturing or uploading user photos
export const PhotoInput = () => {
  // Ref for webcam component
  const webcamRef = useRef(null);
  // State to track if camera is on or off
  const [isCameraOn, setIsCameraOn] = useState(true);
  // State to track loading state
  const [loading, setLoading] = useState(false);
  // Navigation hook for redirecting users
  const navigate = useNavigate();
  // Toast hook for displaying messages to the user
  const toast = useToast();

  // Function to capture photo from webcam
  const capturePhoto = async () => {
    // Get screenshot from webcam
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      setLoading(true); // Set loading state to true
      // Convert image data to a blob
      const blob = await fetch(imageSrc).then((res) => res.blob());

      // Create form data
      const formData = new FormData();
      formData.append("photo", blob);

      // Send the image to the API endpoint
      const response = await axiosInstance.post(
        "/profiles/verify-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully", response.data);

      // Navigate to the profile page with the response data
      navigate(`/${response.data.id}`, {
        state: { profileData: response.data },
      });
    } catch (error) {
      console.error("Error uploading image", error);
      // Display error message using toast
      toast({
        title: "Error uploading image",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to handle photo upload from file input
  const uploadPhoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true); // Set loading state to true
      const formData = new FormData();
      formData.append("photo", file);

      // Send the image to the API endpoint
      const response = await axiosInstance.post(
        "/profiles/verify-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully", response.data);

      // Navigate to the profile page with the response data
      navigate(`/${response.data.id}`, {
        state: { profileData: response.data },
      });
    } catch (error) {
      console.error("Error uploading image", error);
      // Display error message using toast
      toast({
        title: "Error uploading image",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to toggle camera on or off
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  // If loading, display spinner
  if (loading) {
    return (
      <Flex height="89vh" alignItems="center" justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="green.200"
          color="green.500"
          size="xl"
        />
      </Flex>
    );
  }

  // Render webcam and buttons for capturing or uploading photo
  return (
    <Flex height="89vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        // Set background color based on color mode
        background={useColorModeValue("gray.300", "gray.700")}
        p={6}
        rounded={6}
      >
        {/* Webcam component */}
        <Webcam
          audio={false}
          ref={webcamRef}
          style={{
            display: isCameraOn ? "block" : "none",
            width: "600px",
            height: "400px",
          }}
          videoConstraints={VideoConstraints}
          screenshotFormat="image/jpeg"
          mirrored={true}
        />
        {/* Button to toggle camera on or off */}
        <Button mt={3} width={150} onClick={toggleCamera}>
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </Button>
        {/* Button to capture photo */}
        <Button
          mt={3}
          width={150}
          onClick={capturePhoto}
          disabled={!isCameraOn}
        >
          Capture Image
        </Button>
        {/* File input to upload photo */}
        <Input
          type="file"
          accept="image/*"
          onChange={uploadPhoto}
          display="none"
          id="upload-photo"
        />
        {/* Button to trigger file input */}
        <Button mt={3} width={150} as="label" htmlFor="upload-photo">
          Upload Image
        </Button>
      </Flex>
    </Flex>
  );
};
