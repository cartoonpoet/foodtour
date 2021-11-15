import React from "react";
import './SearchBar.css';
import { Link, BrowserRouter } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
    return (
        <div className="search-bar">
            <BrowserRouter>
                <Link to="/">
                    <img src="assets/logo/logo.png" alt="title logo" className="logo" />
                </Link>
            </BrowserRouter>
            <input className="searching" placeholder="음식점 또는 관광지를 검색하세요." maxLength="50" />
            <button className="search-btn"><BsSearch /></button>
        </div>
    );
}

export default SearchBar;