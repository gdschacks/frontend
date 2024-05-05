import { useEffect, useState } from "react";
import axios from "axios";
import "./feedback.scss";
import Tags from "./Tags";

const Feedback = ({ chat }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    handleSynthesize(chat);
  }, [chat]);

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
        <span>Question:</span> Tell me about yourself.
      </p>
      <p>
        <span>Feedback:</span>
      </p>
      <div className="white_box">
        <div className="tag_box">
          <Tags text="✅ Grammar" color="#E0E9E1" />
          <Tags text="❌ Tense" color="#F6CFCD" />
          <Tags text="✅ Repetition" color="#E0E9E1" />
        </div>

        <p>
          <span>Stutter:</span> You said “um” or “uh”{" "}
          <span className="red_underline">thrice</span> during the interview.{" "}
        </p>
      </div>
      <p>
        <span>Improved Response:</span> Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Original Respone: Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>
        <span>Original Response:</span> Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Original Respone: Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="yellow_box">
        <p>
          <span>View Tips and Tricks</span>
        </p>
      </div>
      {audioSrc && (
        <audio style={{ display: "none" }} controls autoPlay src={audioSrc} />
      )}

      {/* {chat.map((chat, index) => {
        return (
          <div key={index}>
            <p>{chat.parts[0].text}</p>
          </div>
        );
      })} */}
      {chat.length ? <p>{chat}</p> : null}
     
    </div>
  );
};

export default Feedback;
