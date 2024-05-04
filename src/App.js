import "./App.css";
import SpeechToText from "./components/speechToText";
import Gemini from "./components/gemini";
import TextToSpeech from "./components/textToSpeech";
import { useState } from "react";
import WebcamCapture from "./webcapture";
import Feedback from "./components/feedback";
import Interview from "./components/interview";
import Evaluate from "./components/evaluate";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currQIndex, setCurrQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const [questions, setQuestions] = useState([
    "Hello, tell me about yourself?",
    "Tell me about a time you solved a conflict.",
  ]);
  const [company, setCompany] = useState("Google");

  const handleTranscriptionsChange = (newAnswer) => {
    setAnswers(newAnswer);
  };

  const handleChatUpdate = (newChatHistory) => {
    setChatHistory(newChatHistory);
  };

  const handleFeedbackUpdate = (newFeedback) => {
    setFeedback(newFeedback);
  };

  const handleNextQuestion = () => {
    setCurrQIndex(currQIndex + 1);
  };

  return (
    <div className="App">
      {/* gets transcriptions */}
      {/* <SpeechToText onTranscriptionsChange={handleTranscriptionsChange} /> */}
      {/* <TextToSpeech chat={chatHistory} /> */}
      {/* writes a response to the transcription */}
      <Evaluate
        answers={answers}
        company={company}
        question={questions[currQIndex]}
        onUpdate={handleChatUpdate}
        onFeedbackUpdate={handleFeedbackUpdate}
        onErrorEvaluation={setErrors}
      />
      <Feedback chat={feedback} />
      <Interview
        question={questions[currQIndex]}
        onHandleNextQuestion={handleNextQuestion}
        onTranscriptionsChange={handleTranscriptionsChange}
        errors={errors}
      />
      {/* <WebcamCapture /> */}
    </div>
  );
}

export default App;
