import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Google from "./pages/GoogleLogin";
import Github from "./pages/GithubLogin";
import EmailLogin from "./pages/EmailLogin";
import EmailSignup from "./pages/EmailSignup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-login" element={<EmailLogin />} />
      <Route path="/email-signup" element={<EmailSignup/>} />
      <Route path="/login/google" element={<Google />} />
      <Route path="/login/github" element={<Github />} />
    </Routes>
  );
}

export default App;
