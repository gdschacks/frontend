import "./App.css";
import SpeechToText from "./components/speechToText";
import Gemini from "./components/gemini";
import TextToSpeech from "./components/textToSpeech";
import { useEffect, useState } from "react";
import WebcamCapture from "./webcapture";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [transcriptions, setTranscriptions] = useState([]);

  const handleTranscriptionsChange = (newTranscriptions) => {
    setTranscriptions(newTranscriptions);
  };

  const handleChatUpdate = (newChatHistory) => {
    setChatHistory(newChatHistory);
  };

  // useEffect(() => {
  //   console.log(transcriptions);
  // }, [transcriptions]);

  return (
    <div className="App">
      {/* gets transcriptions */}
      <SpeechToText onTranscriptionsChange={handleTranscriptionsChange} />
      {/* writes a response to the transcription */}
      <Gemini transcriptions={transcriptions} onUpdate={handleChatUpdate} />
      <TextToSpeech chat={chatHistory} />
      <WebcamCapture />
    </div>
  );
}

export default App;
