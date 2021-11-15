import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import TopNav from "./conponents/TopNav";
import SearchBar from "./conponents/SearchBar";
import './conponents/common.css';

function App() {
  return (
    <>
      <TopNav />
      <SearchBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
