import React, { useState, useEffect } from "react";
import "./SearchResult.css";
import Element from "../conponents/Element";
import Paging from "../conponents/Paging";
import dotenv from "dotenv";
import axios from 'axios';
import none_img from '../assets/none-img/none-img.jpg';
import CircularProgress from '@mui/material/CircularProgress';

dotenv.config({ path: "../.env" });

function SearchResult({ match }) {
    const { keyword } = match.params;
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const [page, setPage] = useState(1);

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
        let contentTypeId = '';
        switch (option.selectValue) {
            case "음식점":
                contentTypeId = 39;
                break;
            case "관광지":
                contentTypeId = 12;
                break;
            default:
                contentTypeId = '';
                break;
        }
        setIsLoading(true)
        axios.get("http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword", {
            params: {
                serviceKey: process.env.REACT_APP_TOUR_API_DECODING_KEY,
                MobileApp: "FoodTour",
                MobileOS: "ETC",
                pageNo: 1,
                numOfRows: 1000000000,
                listYN: "Y",
                arrange: "P",
                contentTypeId: contentTypeId,
                keyword: keyword,
                _type: "json"
            }
        })
            .then(function (response) {
                //response
                const result = response.data;
                // console.log("total : " + result.response.body.totalCount);
                let dataSet = [];
                for (let i = 0; i < result.response.body.totalCount; i++) {
                    if (result.response.body.items.item[i].contenttypeid === 12 || result.response.body.items.item[i].contenttypeid === 39) {
                        dataSet.push({
                            firstimage: result.response.body.items.item[i].firstimage ? result.response.body.items.item[i].firstimage : none_img,
                            contentid: result.response.body.items.item[i].contentid,
                            contentTypeId: result.response.body.items.item[i].contenttypeid,
                            title: result.response.body.items.item[i].title
                        });
                    }
                }
                setSearchData([...dataSet]);
                setIsLoading(false);
            }).catch(function (error) {
                //오류발생시 실행
            }).then(function () {
                //항상 실행
            });
    }, [option.selectValue, keyword]);




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
                {isLoading ? (<div className="progress-bar">
                    <CircularProgress color="secondary" />
                </div>) : (<div>
                    <div className="result-elements">
                        {searchData.map((value, i) => (
                            <React.Fragment key={i}>
                                <Element firstImage={value.firstimage}
                                    title={value.title}
                                    contentTypeId={value.contentTypeId}
                                    contentId={value.contentId}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    <Paging className="paging"
                        page={page}
                        totalItemsCount={searchData.length}
                        handlePageChange={handlePageChange}
                    />
                </div>)}



            </div>
        </>
    );
}

export default SearchResult;