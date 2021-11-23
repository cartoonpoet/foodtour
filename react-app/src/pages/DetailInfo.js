import React, { useEffect, useState } from "react";
import "./DetailInfo.css";
import queryString from "query-string";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { BsFillEyeFill, BsFillPencilFill } from "react-icons/bs";
import Map from "../components/Map";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import NoneDataAlert from "../components/NoneDataAlert";
import Review from "../components/Review";
import ReviewEdit from "../components/ReviewEdit";

SwiperCore.use([Pagination, Navigation]);

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 50],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};

function DetailInfo({ location }) {
  const query = queryString.parse(location.search);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(query);
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
    lcnsno: null, //인허가번호

    //리뷰 데이터
    review: []
  });

  const words = [
    {
      text: "맛있다",
      value: 1,
    },
    {
      text: "뷰가 죽여줘요",
      value: 2,
    },
    {
      text: "여기가 찐 맛집",
      value: 3,
    },
    {
      text: "인스타맛집",
      value: 10,
    },
    {
      text: "1fsadfsda",
      value: 4,
    },
    {
      text: "2fsdaf",
      value: 4,
    },
    {
      text: "fsdafsdafs",
      value: 4,
    },
    {
      text: "fa",
      value: 4,
    },
    {
      text: "fsdafsa",
      value: 4,
    },
    {
      text: "wwq",
      value: 4,
    },
    {
      text: "sdagasgg",
      value: 4,
    },
  ];

  useEffect(() => {
    const getCommonInfo = () => {
      return axios.get(
        "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon",
        {
          params: {
            ServiceKey: process.env.REACT_APP_TOUR_API_DECODING_KEY,
            numOfRows: 10,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            contentId: query.contentid,
            contentTypeId: query.contenttypeid,
            defaultYN: "Y",
            firstImageYN: "N",
            areacodeYN: "N",
            catcodeYN: "N",
            addrinfoYN: "Y",
            mapinfoYN: "Y",
            overviewYN: "Y",
            _type: "json",
          },
        }
      );
    };

    const getImageInfo = () => {
      return axios.get(
        "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage",
        {
          params: {
            ServiceKey: process.env.REACT_APP_TOUR_API_DECODING_KEY,
            numOfRows: 100,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            contentId: query.contentid,
            imageYN: "Y",
            subImageYN: "Y",
            _type: "json",
          },
        }
      );
    };

    const getIntroInfo = () => {
      return axios.get(
        "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro",
        {
          params: {
            ServiceKey: process.env.REACT_APP_TOUR_API_DECODING_KEY,
            numOfRows: 10,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            contentId: query.contentid,
            contentTypeId: query.contenttypeid,
            _type: "json",
          },
        }
      );
    };

    const getReviewInfo = () => {
      return axios.get(
        "http://localhost:4000/api/review",
        {
          params: {
            contentid: query.contentid,
            contenttypeid: query.contenttypeid,
          },
        }
      );
    }

    setIsLoading(true);
    setCommonData({});
    axios
      .all([getCommonInfo(), getImageInfo(), getIntroInfo(), getReviewInfo()])
      .then(
        axios.spread((commonResp, ImageResp, IntroResp, reviewResp) => {
          commonResp = commonResp.data.response.body.items.item;
          ImageResp = ImageResp.data.response.body.items.item;
          IntroResp = IntroResp.data.response.body.items.item;
          console.log(reviewResp.data)
          let allData = { ...commonResp, ...IntroResp, review: reviewResp.data };
          allData.images = ImageResp;
          setCommonData(allData);
          setIsLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [query.contentid, query.contenttypeid]);

  const overview = () => {
    return { __html: commonData.overview };
  };

  const homepage = () => {
    return { __html: commonData.homepage };
  };

  const tourusetime = () => {
    return { __html: commonData.usetime };
  };

  const tourexpguide = () => {
    return { __html: commonData.expguide };
  };

  const imageRendering = () => {
    const result = [];

    if (commonData.images.length != null) {
      for (let i = 0; i < commonData.images.length; i++) {
        result.push(
          <SwiperSlide key={commonData.images[i].serialnum}>
            <img
              src={commonData.images[i].originimgurl}
              alt="none"
              className="swiper-img-size-fix"
            />
          </SwiperSlide>
        );
      }
    } else {
      result.push(
        <SwiperSlide key={commonData.images.serialnum}>
          <img
            src={commonData.images.originimgurl}
            alt="none"
            className="swiper-img-size-fix"
          />
        </SwiperSlide>
      );
    }

    return result;
  };

  const reviewRendering = () => {
    const result = [];
    for (let i = 0; i < commonData.review.length; i++) {
      result.push(
        <React.Fragment key={commonData.review[i].review_id} >
          <Review review_id={commonData.review[i].review_id}
            content={commonData.review[i].content}
            grade={commonData.review[i].grade}
            nickname={commonData.review[i].nickname}
            profile_img={commonData.review[i].profile_img}
            tags={commonData.review[i].tags}
            write_date={commonData.review[i].write_date}
            user_id={commonData.review[i].user_id}
            imgs_path={commonData.review[i].imgs_path}
          />
        </React.Fragment>
      );
    }

    return result;
  }

  const reviewData_Add = (review) => {
    setCommonData({ ...commonData, review: [review, ...commonData.review] });
  };

  return (
    <>
      <hr className="top-line" />

      {isLoading && (
        <div className="detailinfo-loading-bar">
          <CircularProgress color="secondary" />
        </div>
      )}

      {!isLoading && commonData.title != null && (
        <div>
          <ul className="title-box">
            <li className="type">
              {query.contenttypeid === "12" ? "관광지" : "음식점"}
            </li>
            <li className="title">{commonData.title}</li>
            <li className="extra-info-box">
              <BsFillEyeFill />
              <span className="views">117,495</span>
              <BsFillPencilFill />
              <span className="reviews">41</span>
            </li>
          </ul>

          {commonData.images && (
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              className="mySwiper"
            >
              {imageRendering()}
            </Swiper>
          )}

          <div className="detail-info-container">
            <ul className="text-info-box">
              {commonData.overview && (
                <>
                  <li className="info-type-name">소개</li>
                  <li className="detail-info">
                    <div dangerouslySetInnerHTML={overview()} />
                  </li>
                </>
              )}

              {commonData.zipcode && (
                <>
                  <li className="info-type-name">우편번호</li>
                  <li className="detail-info">{commonData.zipcode}</li>
                </>
              )}

              {commonData.addr1 && (
                <>
                  <li className="info-type-name">주소</li>
                  <li className="detail-info">{commonData.addr1}</li>
                </>
              )}

              <Map mapx={commonData.mapx} mapy={commonData.mapy} />

              {commonData.homepage && (
                <>
                  <li className="info-type-name">홈페이지</li>
                  <li className="detail-info">
                    <div dangerouslySetInnerHTML={homepage()} />
                  </li>
                </>
              )}

              {/* 관광지 정보들 */}
              {commonData.accomcount && (
                <>
                  <li className="info-type-name">수용인원</li>
                  <li className="detail-info">{commonData.accomcount}</li>
                </>
              )}

              {commonData.chkbabycarriage && (
                <>
                  <li className="info-type-name">유모차대여 정보</li>
                  <li className="detail-info">{commonData.chkbabycarriage}</li>
                </>
              )}

              {commonData.chkcreditcard && (
                <>
                  <li className="info-type-name">신용카드가능 정보</li>
                  <li className="detail-info">{commonData.chkcreditcard}</li>
                </>
              )}

              {commonData.chkpet && (
                <>
                  <li className="info-type-name">애완동물동반가능 정보</li>
                  <li className="detail-info">{commonData.chkpet}</li>
                </>
              )}

              {commonData.expagerange && (
                <>
                  <li className="info-type-name">체험가능 연령</li>
                  <li className="detail-info">{commonData.expagerange}</li>
                </>
              )}

              {commonData.expguide && (
                <>
                  <li className="info-type-name">체험안내</li>
                  <li className="detail-info">
                    <div dangerouslySetInnerHTML={tourexpguide()} />
                  </li>
                </>
              )}

              {commonData.infocenter && (
                <>
                  <li className="info-type-name">문의 및 안내</li>
                  <li className="detail-info">{commonData.infocenter}</li>
                </>
              )}

              {commonData.opendate && (
                <>
                  <li className="info-type-name">개장일</li>
                  <li className="detail-info">{commonData.opendate}</li>
                </>
              )}

              {commonData.parking && (
                <>
                  <li className="info-type-name">주차시설</li>
                  <li className="detail-info">{commonData.parking}</li>
                </>
              )}

              {commonData.restdate && (
                <>
                  <li className="info-type-name">쉬는날</li>
                  <li className="detail-info">{commonData.restdate}</li>
                </>
              )}

              {commonData.useseason && (
                <>
                  <li className="info-type-name">이용시기</li>
                  <li className="detail-info">{commonData.useseason}</li>
                </>
              )}

              {commonData.usetime && (
                <>
                  <li className="info-type-name">이용시간</li>
                  <li className="detail-info">
                    <div dangerouslySetInnerHTML={tourusetime()} />
                  </li>
                </>
              )}

              {/* 음식점 정보들 */}
              {commonData.chkcreditcardfood && (
                <>
                  <li className="info-type-name">신용카드가능 정보</li>
                  <li className="detail-info">
                    {commonData.chkcreditcardfood}
                  </li>
                </>
              )}

              {commonData.discountinfofood && (
                <>
                  <li className="info-type-name">할인 정보</li>
                  <li className="detail-info">{commonData.discountinfofood}</li>
                </>
              )}

              {commonData.firstmenu && (
                <>
                  <li className="info-type-name">대표 메뉴</li>
                  <li className="detail-info">{commonData.firstmenu}</li>
                </>
              )}

              {commonData.infocenterfood && (
                <>
                  <li className="info-type-name">문의 및 안내</li>
                  <li className="detail-info">{commonData.infocenterfood}</li>
                </>
              )}

              {commonData.opendatefood && (
                <>
                  <li className="info-type-name">개업일</li>
                  <li className="detail-info">{commonData.opendatefood}</li>
                </>
              )}

              {commonData.opentimefood && (
                <>
                  <li className="info-type-name">영업시간</li>
                  <li className="detail-info">{commonData.opentimefood}</li>
                </>
              )}

              {commonData.packing && (
                <>
                  <li className="info-type-name">포장 가능</li>
                  <li className="detail-info">{commonData.packing}</li>
                </>
              )}

              {commonData.parkingfood && (
                <>
                  <li className="info-type-name">주차시설</li>
                  <li className="detail-info">{commonData.parkingfood}</li>
                </>
              )}

              {commonData.reservationfood && (
                <>
                  <li className="info-type-name">예약안내</li>
                  <li className="detail-info">{commonData.reservationfood}</li>
                </>
              )}

              {commonData.restdatefood && (
                <>
                  <li className="info-type-name">쉬는날</li>
                  <li className="detail-info">{commonData.restdatefood}</li>
                </>
              )}

              {commonData.scalefood && (
                <>
                  <li className="info-type-name">규모</li>
                  <li className="detail-info">{commonData.scalefood}</li>
                </>
              )}

              {commonData.seat && (
                <>
                  <li className="info-type-name">좌석수</li>
                  <li className="detail-info">{commonData.seat}</li>
                </>
              )}

              {commonData.smoking && (
                <>
                  <li className="info-type-name">금연/흡연 여부</li>
                  <li className="detail-info">{commonData.smoking}</li>
                </>
              )}

              {commonData.treatmenu && (
                <>
                  <li className="info-type-name">취급 메뉴</li>
                  <li className="detail-info">{commonData.treatmenu}</li>
                </>
              )}

              {commonData.lcnsno && (
                <>
                  <li className="info-type-name">인허가번호</li>
                  <li className="detail-info">{commonData.lcnsno}</li>
                </>
              )}

              <div className="wordcloud">
                <ReactWordcloud options={options} words={words} />
              </div>
            </ul>
          </div>
          <div className="review-container">
            <div className="review-title">리뷰 (32)</div>
            <ReviewEdit contenttypeid={query.contenttypeid} contentid={query.contentid} commonData={commonData} reviewData_Add={reviewData_Add} />
            {reviewRendering()}
            {/* <Review /> */}
          </div>
        </div>
      )}

      {!isLoading && commonData.title == null && (
        <NoneDataAlert message="존재하지 않는 정보입니다." />
      )}
    </>
  );
}

export default DetailInfo;
