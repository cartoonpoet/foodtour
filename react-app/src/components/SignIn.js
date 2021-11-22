import React from "react";
import "./SignIn.css";
import { GrClose } from "react-icons/gr";
import axios from "axios";


// 카카오 로그인
const { Kakao } = window;

function SignIn(props) {

    const loginWithKakao = () => {
        Kakao.Auth.login({
            success: function (authObj) {
                axios.post("http://localhost:4000/api/cert/kakao", {
                    access_token: authObj.access_token
                }).then((res) => {
                    // console.log(res.data);
                    window.localStorage.setItem("token", res.data.token);
                    props.onModal();
                });
            },
            fail: function (err) {
                alert(JSON.stringify(err))
            },
        })
    };
    return (
        <>
            <div className="modal">
                <div className="popup">
                    <button className="close-btn" onClick={props.onModal}><GrClose /></button>
                    <div>
                        <div className="title">로그인</div>
                        <div className="description">로그인 하면 자기가 방문한 곳에<br />리뷰를 작성할 수 있어요</div>
                        <img src="/assets/signin/kakao_login_large_narrow.png" alt="kakao login" className="kakao" onClick={() => { loginWithKakao({ props }) }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;