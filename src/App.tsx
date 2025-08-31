import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import MultiStepForm from "./AppComponents/MultiStepForm";
import VideoTutorial from "./AppComponents/Video";
import ChatInterface from "./AppComponents/AI/ChatInterface";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/chat" element={<ChatInterface/>} />
        <Route path="/video" element={<VideoTutorial />} />
      </Routes>
    </Router>
  );
};

export default App;
