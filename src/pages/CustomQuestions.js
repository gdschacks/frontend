import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function CustomQuestions() {
  const [inputFields, setInputFields] = useState(["Tell me about yourself", "Why do you want to work at our company?", ""]);

  const handleAddInput = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Header
          title="Custom Questions"
          subtitle="Add your own questions to be tested on"
        />
      </div>
      <div className="p-4 mt-8">
        {inputFields.map((inputField, index) => (
          <div key={index} className="input-group mb-4">
            <input
              type="text"
              className="placeholder:italic placeholder:text-slate-400 border-2 rounded-lg px-4 py-2 w-full h-16"
              placeholder="Type your question..."
              value={inputField}
              onChange={(event) => handleInputChange(index, event)}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="bg-customblue hover:bg-blue-300 text-black py-2 px-4 rounded mx-2"
            onClick={handleAddInput}
          >
            Add Another Question
          </button>
          <button
            className="bg-customblue hover:bg-blue-300 text-black py-2 px-4 rounded mx-2"
          >
            <Link to="/interview" state={inputFields}>Send to Mr Goose</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
