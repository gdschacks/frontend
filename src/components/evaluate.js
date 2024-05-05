import { useEffect, useState } from "react";
import { generate_feedback_prompt, PROMPT_ERROR_PREFIX } from "../constant";

const Evaluate = ({
  answers,
  company,
  question,
  onUpdate,
  onFeedbackUpdate,
  onErrorEvaluation,
  onFormatUserResponse,
}) => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateFeedbackPrompt = (answer) => {
    return `${generate_feedback_prompt(company, question)}${answer}`;
  };

  const generateErrorCheckPrompt = (answer) => {
    return `${PROMPT_ERROR_PREFIX}${answer}`;
  };

  useEffect(() => {
    console.log(answers);
    if (answers.length > 0) {
      const answer = answers.join(" ").replace(/\n/g, ".");
      console.log("User message", answer);
      onFormatUserResponse(answer);
      console.log("prompt", generateFeedbackPrompt(answer));
      talkToGemini(answer);
      console.log("error prompt", generateErrorCheckPrompt(answer));
      checkErrors(generateErrorCheckPrompt(answer));
    }
  }, [answers]);

  const getErrors = (input) => {
    const result = {
      grammar: false,
      tense: false,
      repetition: false,
      stutters: 0,
    };

    // Check for grammar error
    if (input.includes("grammar error")) {
      result.grammar = true;
    }

    // Check for tense error
    if (input.includes("tense error")) {
      result.tense = true;
    }

    // Check for repetition
    if (input.includes("repetition")) {
      result.repetition = true;
    }

    // Check for stutter x times
    const stutterMatch = input.match(/stuttered (\d+) time(s)?/);
    if (stutterMatch) {
      result.stutters = parseInt(stutterMatch[1]);
    }

    return result;
  };

  const checkErrors = async (answer) => {
    try {
      console.log(answer);
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: answer,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(options);
      const response = await fetch("http://localhost:8080/gemini", options);
      const data = await response.text();
      console.log("gemini error feedback", data);

      console.log(getErrors(data));
      onErrorEvaluation(getErrors(data));
    } catch (error) {
      console.error("Error sending transcription to Gemini:", error);
    }
  };

  const talkToGemini = async (answer) => {
    try {
      // console.log(chatHistory);
      console.log(answer);
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: generateFeedbackPrompt(answer),
        }),
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
      onFeedbackUpdate(data);
    } catch (error) {
      console.error("Error sending transcription to Gemini:", error);
    }
  };

  return <></>;
};

export default Evaluate;
