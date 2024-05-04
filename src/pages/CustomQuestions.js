import React, { useState } from "react";

export default function CustomQuestions() {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleAddInput = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  return (
    <div className="p-4 mt-12">
      {inputFields.map((inputField, index) => (
        <div key={index} className="input-group mb-4">
          <input
            type="text"
            className="border rounded-lg px-4 py-2 w-full h-16"
            value={inputField.value}
            onChange={(event) => handleInputChange(index, event)}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <button
          className="bg-customblue hover:bg-blue-300 text-black font-bold py-2 px-4 rounded mx-2"
          onClick={handleAddInput}
        >
          Add Another Question
        </button>
        <button className="bg-customblue hover:bg-blue-300 text-black font-bold py-2 px-4 rounded mx-2">
          Send to Mr Goose
        </button>
      </div>
    </div>
  );
}
