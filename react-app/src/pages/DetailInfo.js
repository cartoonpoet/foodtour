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

    const tourusetime = () => {
        return { __html: commonData.usetime };
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


                        {/* 관광지 정보들 */}
                        {commonData.accomcount && <><li className="info-type-name">수용인원</li>
                            <li className="detail-info">{commonData.accomcount}</li></>}

                        {commonData.chkbabycarriage && <><li className="info-type-name">유모차대여 정보</li>
                            <li className="detail-info">{commonData.chkbabycarriage}</li></>}

                        {commonData.chkcreditcard && <><li className="info-type-name">신용카드가능 정보</li>
                            <li className="detail-info">{commonData.chkcreditcard}</li></>}

                        {commonData.chkpet && <><li className="info-type-name">애완동물동반가능 정보</li>
                            <li className="detail-info">{commonData.chkpet}</li></>}

                        {commonData.expagerange && <><li className="info-type-name">체험가능 연령</li>
                            <li className="detail-info">{commonData.expagerange}</li></>}

                        {commonData.expguide && <><li className="info-type-name">체험안내</li>
                            <li className="detail-info">{commonData.expguide}</li></>}

                        {commonData.infocenter && <><li className="info-type-name">문의 및 안내</li>
                            <li className="detail-info">{commonData.infocenter}</li></>}

                        {commonData.opendate && <><li className="info-type-name">개장일</li>
                            <li className="detail-info">{commonData.opendate}</li></>}

                        {commonData.parking && <><li className="info-type-name">주차시설</li>
                            <li className="detail-info">{commonData.parking}</li></>}

                        {commonData.restdate && <><li className="info-type-name">쉬는날</li>
                            <li className="detail-info">{commonData.restdate}</li></>}

                        {commonData.useseason && <><li className="info-type-name">이용시기</li>
                            <li className="detail-info">{commonData.useseason}</li></>}

                        {commonData.usetime && <><li className="info-type-name">이용시간</li>
                            <li className="detail-info"><div dangerouslySetInnerHTML={tourusetime()} /></li></>}

                        {/* 음식점 정보들 */}
                        {commonData.chkcreditcardfood && <><li className="info-type-name">신용카드가능 정보</li>
                            <li className="detail-info">{commonData.chkcreditcardfood}</li></>}

                        {commonData.discountinfofood && <><li className="info-type-name">할인 정보</li>
                            <li className="detail-info">{commonData.discountinfofood}</li></>}

                        {commonData.firstmenu && <><li className="info-type-name">대표 메뉴</li>
                            <li className="detail-info">{commonData.firstmenu}</li></>}

                        {commonData.infocenterfood && <><li className="info-type-name">문의 및 안내</li>
                            <li className="detail-info">{commonData.infocenterfood}</li></>}

                        {commonData.opendatefood && <><li className="info-type-name">개업일</li>
                            <li className="detail-info">{commonData.opendatefood}</li></>}

                        {commonData.opentimefood && <><li className="info-type-name">영업시간</li>
                            <li className="detail-info">{commonData.opentimefood}</li></>}

                        {commonData.packing && <><li className="info-type-name">포장 가능</li>
                            <li className="detail-info">{commonData.packing}</li></>}

                        {commonData.parkingfood && <><li className="info-type-name">주차시설</li>
                            <li className="detail-info">{commonData.parkingfood}</li></>}

                        {commonData.reservationfood && <><li className="info-type-name">예약안내</li>
                            <li className="detail-info">{commonData.reservationfood}</li></>}

                        {commonData.restdatefood && <><li className="info-type-name">쉬는날</li>
                            <li className="detail-info">{commonData.restdatefood}</li></>}

                        {commonData.scalefood && <><li className="info-type-name">규모</li>
                            <li className="detail-info">{commonData.scalefood}</li></>}

                        {commonData.seat && <><li className="info-type-name">좌석수</li>
                            <li className="detail-info">{commonData.seat}</li></>}

                        {commonData.smoking && <><li className="info-type-name">금연/흡연 여부</li>
                            <li className="detail-info">{commonData.smoking}</li></>}

                        {commonData.treatmenu && <><li className="info-type-name">취급 메뉴</li>
                            <li className="detail-info">{commonData.treatmenu}</li></>}

                        {commonData.lcnsno && <><li className="info-type-name">인허가번호</li>
                            <li className="detail-info">{commonData.lcnsno}</li></>}
                    </ul>
                </div>
            </div>
            }
        </>
    );
}

export default DetailInfo;