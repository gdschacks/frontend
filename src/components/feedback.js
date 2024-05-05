import { useEffect, useState } from "react";
import axios from "axios";
import "./feedback.scss";
import Tags from "./Tags";

const Feedback = ({ chat, question, errors, originalResponse }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    handleSynthesize(question);
  }, [question]);

  const handleSynthesize = async (text) => {
    try {
      const response = await axios.post("http://localhost:8080/synthesize", {
        text,
      });
      const newAudioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
      setAudioSrc(newAudioSrc);
    } catch (error) {
      console.error("Failed to fetch audio:", error);
    }
  };

  return (
    <div className="feedback">
      <p>
        <span>Question:</span> {question}
      </p>
      <p>
        <span>Feedback:</span>
      </p>
      <div className="white_box">
        <div className="tag_box">
          <Tags
            text={`${errors?.grammar ? "❌" : "✅"} Grammar`}
            color={`${errors?.grammar ? "#F6CFCD" : "#E0E9E1"}`}
          />
          <Tags
            text={`${errors?.tense ? "❌" : "✅"} Tense`}
            color={`${errors?.tense ? "#F6CFCD" : "#E0E9E1"}`}
          />
          <Tags
            text={`${errors?.repetition ? "❌" : "✅"} Repetition`}
            color={`${errors?.repetition ? "#F6CFCD" : "#E0E9E1"}`}
          />
        </div>

        {errors?.stutters ? (
          <p>
            <span>Stutters:</span> You said “um” or “uh”{" "}
            <span className="red_underline">{`${errors.stutters || "0"}`}</span>{" "}
            time(s) during the response.{" "}
          </p>
        ) : (
          <p>Hooray! You were fluent all throughout!</p>
        )}
      </div>
      <p>
        <span>Improved Response:</span> {chat}
      </p>
      <p>
        <span>Original Response:</span> {originalResponse}
      </p>
      <div className="yellow_box">
        <p>
          <span>View Tips and Tricks</span>
        </p>
      </div>
      {audioSrc && (
        <audio style={{ display: "none" }} controls autoPlay src={audioSrc} />
      )}
    </div>
  );
};

export default Feedback;
