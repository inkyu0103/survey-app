import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Survey from "./pages/Survey";
import UserInfo from "./pages/UserInfo";
import Admin from "./pages/admin";
import Evaluate from "./pages/evaluate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/results" element={<Results />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/evaluate" element={<Evaluate />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
