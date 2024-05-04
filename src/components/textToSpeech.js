import { useEffect, useState } from "react";
import axios from "axios";

const TextToSpeech = ({ chat }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    if (
      chat.length > 0 &&
      chat[chat.length - 1].role === "model"
    ) {
      const textToSynthesize =
        chat[chat.length - 1].parts[0].text;
      handleSynthesize(textToSynthesize);
    }
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
    <div>
      {audioSrc && (
        <audio style={{ display: "none" }} controls autoPlay src={audioSrc} />
      )}
      {chat.map((chat, index) => {
        return (
          <div key={index}>
            <p>{chat.parts[0].text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TextToSpeech;
