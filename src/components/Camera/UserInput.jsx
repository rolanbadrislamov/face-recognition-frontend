import React, { useRef, useState } from "react";
import {
  Button,
  Flex,
  useColorModeValue,
  Spinner,
  Center,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Webcam from "react-webcam";
import axiosInstance from "../../services/axios";

const VideoConstraints = {
  width: 600,
  height: 400,
  facingMode: "user",
};

export const UserInput = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      setLoading(true); // Set loading state
      // Convert image data to a blob
      const blob = await fetch(imageSrc).then((res) => res.blob());

      // Create form data
      const formData = new FormData();
      formData.append("photo", blob);

      // Send the image to your API endpoint
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

      // Navigate to the profile with the response data
      navigate(`/${response.data.id}`, { state: { profileData: response.data } });
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const uploadPhoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true); // Set loading state
      const formData = new FormData();
      formData.append("photo", file);

      // Send the image to your API endpoint
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

      // Navigate to the profile with the response data
      navigate(`/${response.data.id}`, { state: { profileData: response.data } });
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  if (loading) {
    return (
      <Center mt={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="green.200"
          color="green.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Flex height="89vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.300", "gray.700")}
        p={6}
        rounded={6}
      >
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
        <Button mt={3} width={150} onClick={toggleCamera}>
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </Button>
        <Button
          mt={3}
          width={150}
          onClick={capturePhoto}
          disabled={!isCameraOn}
        >
          Capture Image
        </Button>
        <Input
          type="file"
          accept="image/*"
          onChange={uploadPhoto}
          display="none"
          id="upload-photo"
        />
        <Button mt={3} width={150} as="label" htmlFor="upload-photo">
          Upload Image
        </Button>
      </Flex>
    </Flex>
  );
};
