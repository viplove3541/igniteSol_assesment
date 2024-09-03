import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/Common.css";
import "./Styles/Theme.css";
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import ReadBook from "./Pages/ReadBook";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/:category" element={<Books />} />
          <Route path="readbook" element={<ReadBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
