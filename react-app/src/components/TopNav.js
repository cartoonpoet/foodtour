import React, { useState } from "react";
import './TopNav.css';
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import SignIn from './SignIn';

// 즐겨찾기
function bookmark_add() {
    let bookmark_url = "http://localhost:3000/";
    let bookmark_name = "FoodTour";

    try {
        window.external.AddFavorite(bookmark_url, bookmark_name);
    } catch (e) {
        alert('이 브라우저는 즐겨찾기 추가 기능을 지원하지 않습니다.');
        return false;
    }
}

function TopNav() {
    const [modal, setModal] = useState(false);

    const onModal = () => setModal(modal => !modal);
    const onRemoveToken = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("kakao_id");
        window.location.reload();
    };

    return (
        <div className="top-nav">
            <div className="side-container">
                <Link to="/" className="elements-align elements"><AiFillHome />&nbsp;홈으로</Link>
                <div className="elements-align v-line">|</div>
                <span className="elements-align elements" onClick={bookmark_add}>즐겨찾기</span>
                <span className="elements-align v-line">|</span>
                {!window.localStorage.getItem("token") && <span className="elements-align elements" onClick={onModal}>로그인</span>}
                {window.localStorage.getItem("token") && <span className="elements-align elements" onClick={onRemoveToken}>로그아웃</span>}
                {modal && <SignIn onModal={onModal} />}
            </div>
        </div>
    );
}

export default TopNav;