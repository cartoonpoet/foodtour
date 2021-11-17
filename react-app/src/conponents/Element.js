import React from "react";
import "./Element.css";
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Element() {
    return (
        <>
            <div className="element-container">
                <Link to="/">
                    <img className="thumb" alt="img is not" src="https://mp-seoul-image-production-s3.mangoplate.com/513273_1598598343472200.jpg?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80" />
                </Link>
                <ul class="info-box">
                    <li className="name-canvas"><Link to="/" className="name">스시ddsdfsdfsdfsdfdsfsdffsdffsdfsdffds호시카이</Link> <span className="grade">4.7</span></li>
                    <li className="fliter-type">음식점</li>
                    <li className="extra-info">
                        <BsFillEyeFill className="views" />1,000
                        <BsFillPencilFill className="reviews" />245
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Element;