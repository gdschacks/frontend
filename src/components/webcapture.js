import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./webcapture.scss";

function WebcamCapture() {
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
          console.log(
            `Detected expression: ${
              highestExpression.expression
            }, Score: ${highestExpression.probability.toFixed(2)}`
          );
        }
        // canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        //   videoRef.current
        // );
        // faceapi.matchDimensions(canvasRef.current, { width: 720, height: 560 });
        // const resizedDetections = faceapi.resizeResults(detections, {
        //   width: 720,
        //   height: 560,
        // });
        // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted className="webcam-video" />
    </div>
  );
}

export default WebcamCapture;
