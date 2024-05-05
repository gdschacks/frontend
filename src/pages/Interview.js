import { useEffect, useState } from "react";
import WebcamCapture from "../webcapture";
import Evaluate from "../components/evaluate";
import QuestionAndAnswer from "../components/questionAnswer";
import Feedback from "../components/feedback";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

export default function Interview() {
  const location = useLocation();
  const receivedState = location.state;
  console.log(receivedState)
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
      <Navbar />
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
      <QuestionAndAnswer
        question={questions[currQIndex]}
        onHandleNextQuestion={handleNextQuestion}
        onTranscriptionsChange={handleTranscriptionsChange}
        errors={errors}
      />
    </div>
  );
}
