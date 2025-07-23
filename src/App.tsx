import { Route, Routes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Survey from "./pages/Survey";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/results" element={<Results />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
