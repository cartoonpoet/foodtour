import React from "react";
import "./ProfileRemove.css";
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import { orange } from '@mui/material/colors';

function ProfileRemove() {
    return (
        <>
            <hr className="top-line" />
            <div className="remove-container">
                <div className="remove-notice">회원탈퇴에 앞서 <span className="text-emphasis">유의사항 및 안내</span>를 반드시 읽고 진행해 주세요.</div>
                <ul className="agreement-form">
                    <li className="notice-box">
                        <div className="remove-title">아이디 복구 불가 안내</div>
                        <div className="remove-desc1">회원탈퇴 진행 시 해당 아이디는 복구가 불가능합니다.</div>
                        <div className="remove-desc2">신중히 선택하신 후 결정해주세요.</div>
                        <Checkbox className="agree-checkbox" sx={{
                            '& .MuiSvgIcon-root': { fontSize: 25 }, '&.Mui-checked': {
                                color: orange[600],
                            }
                        }} />
                    </li>
                    <li className="notice-box">
                        <div className="remove-title">내정보 기록 삭제 안내</div>
                        <div className="remove-desc1">내 개인정보는 모두 삭제되며, 삭제된 데이터는 복구되지 않습니다.</div>
                        <div className="remove-desc2">필요한 데이터는 미리 백업을 해주세요</div>
                        <Checkbox className="agree-checkbox" sx={{
                            '& .MuiSvgIcon-root': { fontSize: 25 }, '&.Mui-checked': {
                                color: orange[600],
                            }
                        }} />
                    </li>
                    <li className="notice-box">
                        <div className="remove-title">리뷰 삭제 안내</div>
                        <div className="remove-desc1">리뷰는 모두 삭제되며, 삭제된 리뷰는 복구되지 않습니다.</div>
                        <div className="remove-desc2">신중히 선택하신 후 결정해주세요.</div>
                        <Checkbox className="agree-checkbox" sx={{
                            '& .MuiSvgIcon-root': { fontSize: 25 }, '&.Mui-checked': {
                                color: orange[600],
                            }
                        }} />
                    </li>
                    <li className="btn-group">
                        <Link to="/mypage" className="cancel-btn">취소</Link>
                        <button className="remove-btn">탈퇴</button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ProfileRemove;