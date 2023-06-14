import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import TallyCounter from "./components/pages/Tallycounter";

import { auth } from "./firebase";

import "./App.css";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home name={userName} />} />
          <Route path="/tallycounter" element={<TallyCounter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
