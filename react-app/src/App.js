import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import TopNav from "./conponents/TopNav";
import './conponents/common.css';

function App() {
  return (
    <>
      <TopNav />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
