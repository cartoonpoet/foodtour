import React from "react";
import "./Element.css";
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Element(props) {
    return (
        <>
            <div className="element-container">
                <Link to={`/detail?contenttypeid=${props.contentTypeId}&contentid=${props.contentId}`} className="img-box">
                    <img className="thumb" alt="img is not" src={props.firstImage} />
                </Link>
                <ul className="info-box">
                    <li className="name-canvas"><Link to={`/detail?contenttypeid=${props.contentTypeId}&contentid=${props.contentId}`} className="name">{props.title}</Link> <span className="grade">4.7</span></li>
                    <li className="fliter-type">{props.contentTypeId === 12 ? "관광지" : "음식점"}</li>
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