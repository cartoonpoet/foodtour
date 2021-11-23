import React, { useEffect, useState } from "react";
import "./Element.css";
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from 'axios';

function Element(props) {
    const [count, setCount] = useState({
        grade: 0,
        views: 0,
        reviewCount: 0
    });

    useEffect(() => {
        const getGrade = () => {
            return axios.get(
                "http://localhost:4000/api/review/grade/" + props.contentId
            );
        };

        const getViews = () => {
            return axios.get(
                "http://localhost:4000/api/views/" + props.contentId
            );
        }

        const getReviewCount = () => {
            return axios.get(
                "http://localhost:4000/api/review/count/" + props.contentId
            );
        }

        axios.all([getGrade(), getViews(), getReviewCount()])
            .then(
                axios.spread((getGradeResp, getViewsResp, getReviewCountResp) => {
                    setCount({
                        grade: getGradeResp.data.grade,
                        views: getViewsResp.data.view_count,
                        reviewCount: getReviewCountResp.data.review_count
                    });
                })
            )
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }, [props.contentId]);

    return (
        <>
            <div className="element-container">
                <Link to={`/detail?contenttypeid=${props.contentTypeId}&contentid=${props.contentId}`} className="img-box">
                    <img className="thumb" alt="img is not" src={props.firstImage} />
                </Link>
                <ul className="info-box">
                    <li className="name-canvas"><Link to={`/detail?contenttypeid=${props.contentTypeId}&contentid=${props.contentId}`} className="name">{props.title}</Link> <span className="grade">{parseFloat(count.grade == null ? 0 : count.grade).toFixed(1)}</span></li>
                    <li className="fliter-type">{props.contentTypeId === 12 ? "관광지" : "음식점"}</li>
                    <li className="extra-info">
                        <BsFillEyeFill className="views" />{count.views == null ? 0 : count.views}
                        <BsFillPencilFill className="reviews" />{count.reviewCount}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Element;