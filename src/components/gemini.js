import { useEffect, useState } from "react";

const Gemini = ({ onUpdate, answers }) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    console.log(answers);
    if (answers.length > 0) {
      const answer = answers.join(" ").replace(/\n/g, ".");
      console.log("User message", answer);
      sendResponse(answer);
    }
  }, [answers]);

  const sendResponse = async (answer) => {
    try {
      // console.log(chatHistory);
      const options = {
        method: "POST",
        body: JSON.stringify({ history: chatHistory, message: answer }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8080/gemini", options);
      const data = await response.text();
      console.log("gemini response", data);
      const newChatHistory = [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: answer }],
        },
        {
          role: "model",
          parts: [{ text: data }],
        },
      ];
      console.log(newChatHistory);
      setChatHistory(newChatHistory);
      onUpdate(newChatHistory);
    } catch (error) {
      console.error("Error sending transcription to Gemini:", error);
    }
  };

  return <></>;
};

export default Gemini;
