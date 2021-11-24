import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-box">
                <Link to="/" ><img src="/assets/logo/logo_gray_scale.png" alt="None Footer Logo" className="footer-logo" /></Link>
                <ul className="footer-info">
                    <li>음식점/관광지 정보시스템</li>
                    <li>Made By JunHo-SON</li>
                    <li>Humax Holdings Development Team</li>
                    <li>Copyright ⓒ FOODTOUR INFORMATION SYSTWEM All rights reserved</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;