import React, { useEffect, useState } from "react";
import "./DetailInfo.css";
import queryString from "query-string";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, {
    Pagination, Navigation
} from 'swiper';
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs";
import Map from '../components/Map';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { common } from "@mui/material/colors";

SwiperCore.use([Pagination, Navigation]);

function DetailInfo({ location }) {
    const query = queryString.parse(location.search);
    const [isLoading, setIsLoading] = useState(false);
    console.log(query);
    const [commonData, setCommonData] = useState({
        //공통데이터
        title: null,
        homepage: null,
        mapx: null,
        mapy: null,
        addr: null,
        zipcode: null,
        overview: null,

        //이미지 데이터
        images: null,

        //관광지 데이터
        accomcount: null, //수용인원
        chkbabycarriage: null, //유모차대여 정보
        chkcreditcard: null, //신용카드가능 정보
        chkpet: null, //애완동물동반가능 정보
        expagerange: null, //체험가능 연령
        expguide: null, //체험안내
        heritage1: null, //세계 문화유산 유무
        heritage2: null, //세계 자연유산 유무
        heritage3: null, //세계 기록유산 유무
        infocenter: null, //문의 및 안내
        opendate: null, //개장일
        parking: null, //주차시설
        restdate: null, //쉬는날
        useseason: null, //이용시기
        usetime: null, //이용시간

        //음식점 데이터
        discountinfofood: null, //할인정보
        firstmenu: null, //대표메뉴
        infocenterfood: null, //문의 및 안내
        kidsfacility: null, //어린이 놀이방 여부
        opendatefood: null, //개업일
        opentimefood: null, //영업시간
        packing: null, //포장 가능
        parkingfood: null, //주차시설
        reservationfood: null, //예약안내
        restdatefood: null, //쉬는날
        scalefood: null, //규모
        seat: null, //좌석수
        smoking: null, //금연/흡연 여부
        treatmenu: null, //취급 메뉴
        lcnsno: null //인허가번호
    });

    useEffect(() => {
        const getCommonInfo = () => {
            return axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon', {
                params: {
                    'ServiceKey': process.env.REACT_APP_TOUR_API_DECODING_KEY,
                    'numOfRows': 10,
                    'pageNo': 1,
                    'MobileOS': "ETC",
                    'MobileApp': "AppTest",
                    'contentId': query.contentid,
                    'contentTypeId': query.contenttypeid,
                    'defaultYN': 'Y',
                    'firstImageYN': 'N',
                    'areacodeYN': 'N',
                    'catcodeYN': 'N',
                    'addrinfoYN': 'Y',
                    'mapinfoYN': 'Y',
                    'overviewYN': 'Y',
                    '_type': "json"
                }
            });
        };

        const getImageInfo = () => {
            return axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage', {
                params: {
                    'ServiceKey': process.env.REACT_APP_TOUR_API_DECODING_KEY,
                    'numOfRows': 100,
                    'pageNo': 1,
                    'MobileOS': "ETC",
                    'MobileApp': "AppTest",
                    'contentId': query.contentid,
                    'imageYN': 'Y',
                    'subImageYN': 'Y',
                    '_type': "json"
                }
            });
        };

        const getIntroInfo = () => {
            return axios.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro', {
                params: {
                    'ServiceKey': process.env.REACT_APP_TOUR_API_DECODING_KEY,
                    'numOfRows': 10,
                    'pageNo': 1,
                    'MobileOS': "ETC",
                    'MobileApp': "AppTest",
                    'contentId': query.contentid,
                    'contentTypeId': query.contenttypeid,
                    '_type': "json"
                }
            });
        };
        setIsLoading(true);
        setCommonData({});
        axios.all([getCommonInfo(), getImageInfo(), getIntroInfo()])
            .then(axios.spread((commonResp, ImageResp, IntroResp) => {
                commonResp = commonResp.data.response.body.items.item;
                ImageResp = ImageResp.data.response.body.items.item;
                IntroResp = IntroResp.data.response.body.items.item;

                let allData = { ...commonResp, ...IntroResp };
                allData.images = ImageResp;
                console.log(allData.images)
                setCommonData(allData);

                setIsLoading(false);
            })).catch((error) => {
                console.log(error);
                alert(error);
            });
    }, [query.contentid, query.contenttypeid]);

    const overview = () => {
        return { __html: commonData.overview };
    };

    const homepage = () => {
        return { __html: commonData.homepage };
    }

    const imageRendering = () => {
        const result = [];
        for (let i = 0; i < commonData.images.length; i++) {
            result.push(
                <React.Fragment key={commonData.images[i].originimgurl}>
                    <SwiperSlide>
                        <img src={commonData.images[i].originimgurl} alt="none" className="swiper-img-size-fix" />
                    </SwiperSlide>
                </React.Fragment>
            );
        }

        return result;
    }

    return (
        <>
            <hr className="top-line" />

            {isLoading && <div className="detailinfo-loading-bar">
                <CircularProgress color="secondary" />
            </div>}

            {!isLoading && <div><ul className="title-box">
                <li className="type">{query.contenttypeid === "12" ? "관광지" : "음식점"}</li>
                <li className="title">{commonData.title}</li>
                <li className="extra-info-box">
                    <BsFillEyeFill />
                    <span className="views">117,495</span>
                    <BsFillPencilFill />
                    <span className="reviews">41</span>
                </li>
            </ul>

                {commonData.images && <Swiper slidesPerView={3} spaceBetween={10} slidesPerGroup={1} loop={true} loopFillGroupWithBlank={true} pagination={{
                    "clickable": true
                }} navigation={true} className="mySwiper">
                    {imageRendering()}
                    {/* {commonData.images.map((value, index) => (
                        <React.Fragment key={value.id}>

                        </React.Fragment>
                    ))} */}
                </Swiper>}

                <div className="detail-info-container">
                    <ul className="text-info-box">
                        {commonData.overview && <>
                            <li className="info-type-name">소개</li>
                            <li className="detail-info"><div dangerouslySetInnerHTML={overview()} /></li></>}

                        {commonData.zipcode && <><li className="info-type-name">우편번호</li>
                            <li className="detail-info">{commonData.zipcode}</li></>}

                        {commonData.addr1 && <><li className="info-type-name">주소</li>
                            <li className="detail-info">{commonData.addr1}</li></>}

                        <Map mapx={commonData.mapx} mapy={commonData.mapy} />

                        {commonData.homepage && <><li className="info-type-name">홈페이지</li>
                            <li className="detail-info"><div dangerouslySetInnerHTML={homepage()} /></li></>}
                    </ul>

                </div>
            </div>
            }
        </>
    );
}

export default DetailInfo;