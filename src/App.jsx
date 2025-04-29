import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRPage from "./Qr";
import Intro from "./Intro";
import Download from "./Download";
import { UserProvider, useUserContext } from "./UserContext";
import Param from "./Param";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QRPage />} />
          <Route path="/intro" element={<Param />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
