import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Question from "./pages/Question";

function App() {

  let clerkPubKey="pk_test_bWVhc3VyZWQtbW90aC00LmNsZXJrLmFjY291bnRzLmRldiQ"
  
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  );
}

export default App;
