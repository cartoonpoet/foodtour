import React from "react";
import "./SignIn.css";
import { GrClose } from "react-icons/gr";

// 카카오 로그인
const { Kakao } = window;
function loginWithKakao() {
    Kakao.Auth.login({
        success: function (authObj) {
            console.log(JSON.stringify(authObj));
        },
        fail: function (err) {
            alert(JSON.stringify(err))
        },
    })
}

function SignIn(props) {
    return (
        <>
            <div className="modal">
                <div className="popup">
                    <button className="close-btn" onClick={props.onModal}><GrClose /></button>
                    <div>
                        <div className="title">로그인</div>
                        <div className="description">로그인 하면 자기가 방문한 곳에<br />리뷰를 작성할 수 있어요</div>
                        <img src="/assets/signin/kakao_login_large_narrow.png" alt="kakao login" className="kakao" onClick={loginWithKakao} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;