import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Question from "./pages/Question";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
