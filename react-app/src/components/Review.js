import React from "react";
import "./Review.css";
import Rating from "@mui/material/Rating";
import axios from "axios";

function Review(props) {

  const content = () => {
    return { __html: props.content };
  };

  const img = () => {
    const result = [];

    if (props.imgs_path !== "") {
      for (let i = 0; i < props.imgs_path.split("<").length; i++) {
        result.push(
          <React.Fragment key={i}>
            <img
              onClick={() =>
                window.open(
                  "http://localhost:4000" + props.imgs_path.split("<")[i].slice(5),
                  "_blank"
                )
              }
              alt="none img"
              src={"http://localhost:4000" + props.imgs_path.split("<")[i].slice(5)}
            />
          </React.Fragment>
        );

      }
    }
    return result;
  }

  const tag = () => {
    const result = [];
    if (props.tags !== "") {
      for (let i = 0; i < props.tags.split("<").length; i++) {
        result.push(
          <React.Fragment key={i}>
            <span className="hashtag">#{props.tags.split("<")[i]}</span>
          </React.Fragment>
        );
      }
    }
    return result;
  }

  const onDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios.delete("http://localhost:4000/api/review/" + props.review_id)
        .then(function (response) {
          if (response.status === 204) {
            props.reviewData_Remove(props.index);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  return (
    <>
      <ul className="review-box">
        <li className="user-info">
          <img
            alt="이미지를 찾을 수 없습니다."
            src={props.profile_img}
          />
          <div className="top-box">
            <div className="con">
              <div className="nickname">{props.nickname}</div>
              <div className="register-date">{props.write_date}</div>
              {props.user_id === parseInt(window.localStorage.getItem("id")) && <div className="change">수정</div>}
              {props.user_id === parseInt(window.localStorage.getItem("id")) && <div className="remove" onClick={onDelete}>삭제</div>}
            </div>
            <Rating
              name="read-only"
              value={parseInt(props.grade)}
              readOnly
              className="rating"
            />
          </div>
        </li>
        <div className="content">
          <div dangerouslySetInnerHTML={content()} />
        </div>
        <div className="imgs">
          {img()}
        </div>
        <div className="tags">
          {tag()}
        </div>
      </ul>
    </>
  );
}

export default Review;
