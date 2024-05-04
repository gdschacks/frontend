import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const TextToSpeech = ({ onTranscriptionsChange }) => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef(null);

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
    <div>
      <button onClick={toggleTranscription}>
        {isRecording ? "Stop Transcription" : "Start Transcription"}
      </button>
      {/* <h2>Live Transcription</h2>
      {transcriptions.map((transcription, index) => (
        <p key={index}>{transcription}</p>
      ))} */}
    </div>
  );
};

export default TextToSpeech;
