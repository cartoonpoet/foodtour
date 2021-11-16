import React, { useState } from "react";
import './SearchBar.css';
import { Link, BrowserRouter } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
    const [keyword, setKeyword] = useState('');

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <div className="search-bar">
            <BrowserRouter>
                <Link to="/">
                    <img src="assets/logo/logo.png" alt="title logo" className="logo" />
                </Link>
            </BrowserRouter>
            <input className="searching" placeholder="음식점 또는 관광지를 검색하세요." maxLength="50" onChange={onChange} value={keyword} />
            <BrowserRouter>
                <Link to={`/search/${keyword}`} className="search-btn">
                    <BsSearch />
                </Link>
            </BrowserRouter>
            {/* <button className="search-btn"></button> */}
        </div>
    );
}

export default SearchBar;