import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import WebcamCapture from "./webcapture";
import { EMOTIONS } from "../constant";
import "./questionAnswer.scss";
import Goose from "../assets/goose.png";
import Alert from "@mui/material/Alert";

const QuestionAndAnswer = ({
  isLastQuestion,
  question,
  onTranscriptionsChange,
  onHandleEndInterview,
  onHandleNextQuestion,
  errors,
}) => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef(null);
  const [emotion, setEmotion] = useState("neutral");

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080");

      socketRef.current.on("transcription", (newTranscription) => {
        setTranscriptions((prevTranscriptions) => [
          ...prevTranscriptions,
          newTranscription,
        ]);
      });

      socketRef.current.on("recordingStatus", ({ recording }) => {
        setIsRecording(recording);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isRecording && transcriptions.length > 0) {
      onTranscriptionsChange(transcriptions);
      setTranscriptions([]); // clear the transcriptions after sending them out
    }
  }, [isRecording, onTranscriptionsChange, transcriptions]);

  const handleStartTranscription = () => {
    socketRef.current.emit("startTranscription");
  };

  const handleStopTranscription = () => {
    socketRef.current.emit("stopTranscription");
  };

  const toggleTranscription = async () => {
    if (isRecording) {
      handleStopTranscription();
    } else {
      handleStartTranscription();
    }
  };

  return (
    <div className="video-and-controls">
      <WebcamCapture handleChangeEmotion={setEmotion} />
      <div className="controls">
        <p>{`Detected Emotion: ${EMOTIONS[emotion]} ${
          emotion.charAt(0).toUpperCase() + emotion.slice(1)
        }`}</p>
        {emotion.charAt(0).toUpperCase() + emotion.slice(1) !== "Happy" && emotion.charAt(0).toUpperCase() + emotion.slice(1) !== "Neutral" && (
          <div className="alert">
            <Alert severity="warning">Make sure to smile!</Alert>
          </div>
        )}

        <button className="record-button" onClick={toggleTranscription}>
          {`🎤 ${isRecording ? "Stop Recording" : "Start Recording"}`}
        </button>
        <button
          className="next-button"
          onClick={isLastQuestion ? onHandleEndInterview : onHandleNextQuestion}
        >
          {`⏭️ ${isLastQuestion ? "End" : "Next"}`}
        </button>
        <div className="goose_container">
          <div className="dialogue-desktop">
            <img className="goose" src={Goose} alt="Goose" />
            <div className="dialogue-bubble">
              <p>{question}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAndAnswer;
