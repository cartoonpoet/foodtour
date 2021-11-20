import React from "react";
import "./Review.css";
import Rating from "@mui/material/Rating";

function Review() {
  const [value, setValue] = React.useState(2);

  return (
    <>
      <ul className="review-box">
        <li className="user-info">
          <img
            alt="dfdsf"
            src="https://s3-ap-northeast-2.amazonaws.com/mp-seoul-image-production/1789241_1603699569063?fit=around|56:56&crop=56:56;*,*&output-format=jpg&output-quality=80"
          />
          <div className="top-box">
            <div className="con">
              <div className="nickname">국화꽃향기</div>
              <div className="register-date">2021-11-21 02:16:55</div>
              <div className="change">수정</div>
              <div className="remove">삭제</div>
            </div>
            <Rating
              name="read-only"
              value={value}
              readOnly
              className="rating"
            />
          </div>
        </li>
        <div className="content">
          양배추밭 뷰맛집이네요~ 탕수육 맛있어요 양도 많고.. 2인이 짜장 짬뽕
          <br />
          탕슉은 무리예요
          <br />
          fdsfdsfsdfsdf sd fdsfds
          <br />
          fsdfsdffds fdsfdsfsdfsdfsfds fdsfdsfsdfsdfsaaa
        </div>
        <div className="imgs">
          <img
            alt="dfsf"
            src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20211116093012_photo2_73858665a3d7.jpg"
          />
          <img
            alt="dfsf"
            src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20211116093012_photo1_73858665a3d7.jpg"
          />
        </div>
        <div className="tags">
          <span className="hashtag">#좋아요</span>
        </div>
      </ul>
    </>
  );
}

export default Review;
