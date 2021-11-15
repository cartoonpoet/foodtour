import React from "react";
import './TopNav.css';

function TopNav() {
    return (
        <div className="top-nav">
            <div className="side-container">
                <span>홈으로</span>
                <span>즐겨찾기</span>
                <span>로그인</span>
            </div>
        </div>
    );
}

export default TopNav;