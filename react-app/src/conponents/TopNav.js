import React from "react";
import './TopNav.css';
import { AiFillHome } from "react-icons/ai";
import { Link, BrowserRouter } from "react-router-dom";


// 즐겨찾기
function bookmark_add() {
    let bookmark_url = "도메인입력";
    let bookmark_name = "홈페이지 타이틀";

    try {
        window.external.AddFavorite(bookmark_url, bookmark_name);
    } catch (e) {
        alert('이 브라우저는 즐겨찾기 추가 기능을 지원하지 않습니다.');
        return false;
    }
}

// 카카오 로그인
const { Kakao } = window;
function loginWithKakao() {
    Kakao.Auth.login({
        success: function (authObj) {
            alert(JSON.stringify(authObj))
        },
        fail: function (err) {
            alert(JSON.stringify(err))
        },
    })
}

function TopNav() {
    return (
        <div className="top-nav">
            <div className="side-container">
                <BrowserRouter>
                    <Link to="/" className="elements-align elements"><AiFillHome />&nbsp;홈으로</Link>
                    <div className="elements-align v-line">|</div>
                    <span className="elements-align elements" onClick={bookmark_add}>즐겨찾기</span>
                    <span className="elements-align v-line">|</span>
                    <span className="elements-align elements">로그인</span>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default TopNav;