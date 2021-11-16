import React, { useState } from "react";
import "./SearchResult.css";
import Element from "../conponents/Element";

function SearchResult() {
    const [option, setOption] = useState({
        selectList: ["전체", "음식점", "관광지"],
        selectValue: "전체"
    })

    const optionChange = (e) => {
        setOption({
            ...option,
            selectValue: e.target.value
        });
    };



    return (
        <>
            <hr className="top-line" />
            <div className="content-container">
                <ul className="filter-box">
                    {option.selectList.map((value, i) => (
                        <React.Fragment key={i}>
                            <input type="radio"
                                onChange={optionChange}
                                value={value}
                                id={value}
                                style={{ display: "none" }}
                                name="filter-type"
                                checked={option.selectValue === value}
                            />
                            <label htmlFor={value} className="filter-type">{value}</label>
                            {option.selectList.length !== i + 1 && <li className="v-line">|</li>}
                        </React.Fragment>
                    ))}
                </ul>
                <Element />
            </div>
        </>
    );
}

export default SearchResult;