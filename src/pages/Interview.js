import { useState } from "react";
import Evaluate from "../components/evaluate";
import QuestionAndAnswer from "../components/questionAnswer";
import Feedback from "../components/feedback";
import Navbar from "../components/Navbar";
import "./Interview.scss";

export default function Interview() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currQIndex, setCurrQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({
    grammar: false,
    tense: false,
    repetition: false,
    stutters: 0,
  });
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
    <div className="interview-container">
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
        onFormatUserResponse={setUserResponse}
      />
      <div className="main-container">
        <QuestionAndAnswer
          question={questions[currQIndex]}
          onHandleNextQuestion={handleNextQuestion}
          onTranscriptionsChange={handleTranscriptionsChange}
          errors={errors}
        />
        <Feedback
          question={questions[currQIndex]}
          chat={feedback}
          errors={errors}
          originalResponse={userResponse}
        />
      </div>
    </div>
  );
}
