import React from "react";
import "./MyPage.css";
import { AiFillBell } from "react-icons/ai";
import { Link } from "react-router-dom";

function MyPage() {
    return (
        <>
            <hr className="top-line" />
            <div className="mypage-container">
                <ul className="mypage-box">
                    <li className="title"><AiFillBell />&nbsp;추천하는 보호설정</li>
                    <li className="description1">내 개인정보를 항상</li>
                    <li className="description2">최신정보로</li>
                    <li className="description3">관리해주세요!</li>
                </ul>
                <ul className="mypage-box">
                    <li className="title"><AiFillBell />&nbsp;안전하게 보호</li>
                    <li className="description1">내 정보를</li>
                    <li className="description2">최신정보로 관리</li>
                    <Link to="/mypage/modify" className="modify-btn">변경</Link>
                    <li className="description4">주기적으로 변경해주세요</li>
                </ul>
                <ul className="mypage-box">
                    <li className="title"><AiFillBell />&nbsp;개인정보 파기</li>
                    <li className="description1">안전하게</li>
                    <li className="description2">회원탈퇴</li>
                    <Link to="/remove" className="remove-btn">탈퇴</Link>
                    <li className="description4">회원탈퇴시 개인정보는 즉시 파기됩니다</li>
                </ul>
            </div>
        </>
    );
}

export default MyPage;