import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Slider from "./pages/Slider";
import SearchResult from "./pages/SearchResult";
import DetailInfo from "./pages/DetailInfo";
import TopNav from "./components/TopNav";
import SearchBar from "./components/SearchBar";
import './components/common.css';
import Footer from "./components/Footer";
import MyPage from "./pages/MyPage";
import ProfileModify from "./pages/ProfileModify";
import ProfileRemove from "./pages/ProfileRemove";

function App() {
  return (
    <>
      <Router>
        <TopNav />
        <SearchBar />
        <Switch>
          <Route path="/" component={Slider} exact />
          <Route path="/search/:keyword" component={SearchResult} exact />
          <Route path="/detail" component={DetailInfo} exact />
          <Route path="/mypage" component={MyPage} exact />
          <Route path="/mypage/modify" component={ProfileModify} exact />
          <Route path="/mypage/remove" component={ProfileRemove} exact />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
