import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Slider from "./pages/Slider";
import SearchResult from "./pages/SearchResult";
import TopNav from "./conponents/TopNav";
import SearchBar from "./conponents/SearchBar";
import './conponents/common.css';

function App() {
  return (
    <>
      <Router>
        <TopNav />
        <SearchBar />
        <Switch>
          <Route path="/" component={Slider} exact />
          <Route path="/search/:keyword" component={SearchResult} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
