import { useEffect, useState } from "react";

const Gemini = ({ onUpdate, transcriptions }) => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    console.log(transcriptions)
    if (transcriptions.length > 0) {
      const lastTranscriptionString = transcriptions
        .join(" ")
        .replace(/\n/g, ".");
      console.log(lastTranscriptionString);
      sendResponse(lastTranscriptionString);
    }
  }, [transcriptions]);

  const sendResponse = async (transcription) => {
    try {
      // console.log(chatHistory);
      const options = {
        method: "POST",
        body: JSON.stringify({ history: chatHistory, message: transcription }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:8080/gemini", options);
      const data = await response.text();
      const newChatHistory = [
        ...chatHistory,
        {
          role: "user",
          parts: [{ text: transcription }],
        },
        {
          role: "model",
          parts: [{ text: data }],
        },
      ];
      setChatHistory(newChatHistory);
      onUpdate(newChatHistory);
    } catch (error) {
      console.error("Error sending transcription to Gemini:", error);
    }
  };

  return (
    <div>
      {/* {chatHistory.map((chat, index) => (
        <div key={index}>
          <p>
            {chat.role}: {chat.parts[0].text}
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default Gemini;
