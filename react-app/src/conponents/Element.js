import React from "react";
import "./Element.css";
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs";


function Element() {
    return (
        <>
            <div className="element-container">
                <img class="thumb" alt="img is not" src="https://mp-seoul-image-production-s3.mangoplate.com/513273_1598598343472200.jpg?fit=around|359:240&crop=359:240;*,*&output-format=jpg&output-quality=80" />
                <ul class="info-box">
                    <li class="name-canvas"><span className="name">스시ddsdfsdfsdfsdfdsfsdffsdffsdfsdffds호시카이</span> <span class="grade">4.7</span></li>
                    <li>음식점</li>
                    <li>
                        <BsFillEyeFill />&nbsp;1,000
                        <BsFillPencilFill />&nbsp;245
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Element;