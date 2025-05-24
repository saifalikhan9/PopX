import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import "./App.css";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
export default App;
