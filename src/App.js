import "./App.css";
import Interview from "./pages/Interview";
import Landing from "./pages/Landing";
import CustomQuestions from "./pages/CustomQuestions";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/interview" element={<Interview />} exact />
        <Route path="/" element={<Landing />} exact />
        <Route path="/customquestions" element={<CustomQuestions />} exact />
      </Routes>
    </div>
  );
}

export default App;
