import React, { useRef, useState } from "react";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import Webcam from "react-webcam";
import axiosInstance from "../../services/axios";

const VideoConstraints = {
  width: 600,
  height: 400,
  facingMode: "user",
};

export const UserInput = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true); // Initialize camera state
  const [url, setUrl] = useState("");

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);

    try {
      // Convert image data to a blob
      const blob = await fetch(imageSrc).then((res) => res.blob());
      
      // Create form data
      const formData = new FormData();
      formData.append("photo", blob);

      // Send the image to your API endpoint
      const response = await axiosInstance.post("/profiles/verify-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn); // Toggle camera state
  };

  const onUserMedia = () => {
    console.log("User media loaded");
  };

  return (
    <Flex height="89vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
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
          onUserMedia={onUserMedia}
          mirrored={true}
        />
        <Button
          mt={3}
          width={150}
          onClick={toggleCamera} // Changed the function to toggle camera
        >
          {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </Button>
        <Button
          mt={3}
          mb={2}
          width={150}
          onClick={capturePhoto} // Removed unnecessary parentheses
          disabled={!isCameraOn}
        >
          Capture Image
        </Button>
      </Flex>
    </Flex>
  );
};
