import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import ContentEditable from "react-contenteditable";
import "./ReviewEdit.css";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function ReviewEdit(props) {
  const [data, setData] = useState({
    tags: [],
    html: "",
    rating: Number(0),
    imgs: [],
  });

  const handleDelete = (i) => {
    console.log(data);
    setData({ ...data, tags: data.tags.filter((value, index) => index !== i) });
  };

  const handleAddition = (tag) => {
    if (data.tags.length <= 10) {
      setData({ ...data, tags: data.tags.concat(tag) });
    }
  };

  const contentsChange = (e) => {
    setData({ ...data, html: e.target.value });
  };

  const onLoadFile = (e) => {
    const file = e.target.files;
    setData({ ...data, imgs: data.imgs.concat(file) });
  };

  const imgDelete = (i) => {
    setData({
      ...data,
      imgs: data.imgs.filter((value, index) => index !== i.index),
    });
  };

  const reviewAdd = () => {
    if (data.html === "") {
      alert("내용을 입력해주세요");
      return;
    }
    axios.post("http://localhost:4000/api/review", {
      imgs: data.imgs,
      content: data.html,
      tags: data.tags,
      grade: data.rating,
      contentid: props.contentid,
      contenttypeid: props.contenttypeid,
      user_id: window.localStorage.getItem("id")
    })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <div className="review-edit-container">
      <div className="img-upload-box">
        <input
          type="file"
          accept="image/*"
          id="img-upload"
          style={{ display: "none" }}
          onChange={onLoadFile}
        />
        {data.imgs.map((value, index) => (
          <React.Fragment key={index}>
            <img
              alt="none img"
              src={URL.createObjectURL(value[0])}
              className="img-preview"
              onClick={(e) => imgDelete({ index })}
            />
          </React.Fragment>
        ))}
        <label htmlFor="img-upload" className="img-upload-btn">
          사진 업로드
        </label>
      </div>

      <div className="contents">
        <ContentEditable
          className="editable"
          html={data.html}
          onChange={contentsChange}
        />
        <button className="upload-btn" onClick={reviewAdd}>등록</button>
      </div>

      <div className="hashtag-box">
        <ReactTags
          tags={data.tags}
          placeholder="해시태그 입력(최대 10개)"
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="top"
          className="tag-input"
          autofocus={false}
        />
      </div>

      <Rating
        value={data.rating}
        precision={0.5}
        onChange={(event, newValue) => {
          setData({ ...data, rating: newValue });
        }}
      />
    </div>
  );
}

export default ReviewEdit;
