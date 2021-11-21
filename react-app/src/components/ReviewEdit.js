import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import ContentEditable from "react-contenteditable";
import "./ReviewEdit.css";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function ReviewEdit() {
  const [data, setData] = useState({
    tags: [
      { id: "Thailand", text: "Thailand" },
      { id: "India", text: "India" },
    ],
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
    console.log(file);
  };

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
        <button className="upload-btn">등록</button>
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
