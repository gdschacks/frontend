import Interview from "./pages/Interview";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/interview" element={<Interview />} exact />
      </Routes>
    </div>
  );
}

export default App;
