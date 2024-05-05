import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./webcapture.scss";

function WebcamCapture({ handleChangeEmotion }) {
  const videoRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Failed to start video", err);
        });
    };

    loadModels().then(startVideo);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current && faceapi.nets.tinyFaceDetector.params) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();
        if (detections) {
          const expressions = detections.expressions;
          const highestExpression = expressions.asSortedArray()[0]; // Get the most likely expression
          handleChangeEmotion(highestExpression.expression);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted className="webcam-video" />
    </div>
  );
}

export default WebcamCapture;
