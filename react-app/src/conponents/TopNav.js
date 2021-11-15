import React from "react";
import './TopNav.css';
import { AiFillHome } from "react-icons/ai";

function TopNav() {
    return (
        <div className="top-nav">
            <div className="side-container">
                <span><AiFillHome />홈으로</span>
                <span>즐겨찾기</span>
                <span>로그인</span>
            </div>
        </div>
    );
}

export default TopNav;