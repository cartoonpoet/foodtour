import React from "react";
import "./ProfileModify.css";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsFillCameraFill } from "react-icons/bs";

function ProfileModify() {
    return (
        <>
            <hr className="top-line" />
            <div className="profile-modify-container">
                <ul className="notice-box">
                    <li className="notice">프로필 관리</li>
                    <li className="notice-kakao"><RiKakaoTalkFill />&nbsp;카카오로 연동되었습니다.</li>
                </ul>
                <ul className="form">
                    <li className="profile-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="none profile img" />
                        <input type="file" accept="image/*" id="profile-img-select" hidden={true} />
                        <label htmlFor="profile-img-select" className="img-label"><BsFillCameraFill className="camera-icon" /></label>
                    </li>
                    <li className="user-info">
                        <ul className="divided-form">
                            <li className="title">아이디</li>
                            <li><input type="text" name="username" maxLength="50" /></li>
                        </ul>
                        <ul className="divided-form">
                            <li className="title">이메일</li>
                            <li><input type="text" name="email" maxLength="50" /></li>
                        </ul>
                    </li>
                    <li className="user-info">
                        <ul className="divided-form">
                            <li className="title">이름</li>
                            <li><input type="text" name="name" maxLength="50" /></li>
                        </ul>
                        <ul className="divided-form">
                            <li className="title">닉네임</li>
                            <li><input type="text" name="nickname" maxLength="50" /></li>
                        </ul>
                    </li>
                    <li className="btn-group">
                        <button className="cancel-btn">취소</button>
                        <button className="modify-btn">수정</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileModify;