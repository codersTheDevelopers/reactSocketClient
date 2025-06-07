import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinForm from "./components/JoinForm";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinForm />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;