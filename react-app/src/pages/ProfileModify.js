import React, { useState, useEffect } from "react";
import "./ProfileModify.css";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileModify() {
    const [userInfo, setUserInfo] = useState({
        //사용자 정보
        profile_img: "",
        username: "",
        email: "",
        name: "",
        nickname: "",

        //로딩
        isLoading: false
    });
    useEffect(() => {
        axios.get("http://localhost:4000/api/cert/user/" + window.localStorage.getItem("id"))
            .then(function (response) {
                console.log(response.data);
                setUserInfo({
                    ...userInfo,
                    profile_img: response.data.profile_img,
                    name: response.data.name,
                    username: response.data.username,
                    email: response.data.email,
                    nickname: response.data.nickname
                });
            }).catch(function (error) {
                //오류발생시 실행
                console.log(error.request);
            });
    }, []);

    const { profile_img, username, email, name, nickname } = userInfo;

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
        console.log(userInfo);
    };

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
                        <img src={profile_img} alt="none profile img" />
                        <input type="file" accept="image/*" id="profile-img-select" hidden={true} />
                        <label htmlFor="profile-img-select" className="img-label"><BsFillCameraFill className="camera-icon" /></label>
                    </li>
                    <li className="user-info">
                        <ul className="divided-form">
                            <li className="title">아이디</li>
                            <li><input type="text" name="username" maxLength="50" value={username} onChange={onChange} /></li>
                        </ul>
                        <ul className="divided-form">
                            <li className="title">이메일</li>
                            <li><input type="text" name="email" maxLength="50" value={email} onChange={onChange} /></li>
                        </ul>
                    </li>
                    <li className="user-info">
                        <ul className="divided-form">
                            <li className="title">이름</li>
                            <li><input type="text" name="name" maxLength="50" value={name} onChange={onChange} /></li>
                        </ul>
                        <ul className="divided-form">
                            <li className="title">닉네임</li>
                            <li><input type="text" name="nickname" maxLength="50" value={nickname} onChange={onChange} /></li>
                        </ul>
                    </li>
                    <li className="btn-group">
                        <Link to="/mypage" className="cancel-btn">취소</Link>
                        <button className="modify-btn">수정</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileModify;