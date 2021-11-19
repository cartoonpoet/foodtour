import React, { useEffect } from "react";
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


SwiperCore.use([Pagination, Navigation]);

function DetailInfo({ location }) {
    const query = queryString.parse(location.search);
    console.log(query);

    useEffect(() => {

    })

    return (
        <>
            <hr className="top-line" />

            <ul className="title-box">
                <li className="type">{query.contenttypeid === "12" ? "관광지" : "음식점"}</li>
                <li className="title">월드컵공원</li>
                <li className="extra-info-box">
                    <BsFillEyeFill />
                    <span className="views">117,495</span>
                    <BsFillPencilFill />
                    <span className="reviews">41</span>
                </li>
            </ul>

            <Swiper slidesPerView={5} spaceBetween={10} slidesPerGroup={1} loop={true} loopFillGroupWithBlank={true} pagination={{
                "clickable": true
            }} navigation={true} className="mySwiper">
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/44/2680844_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/42/2680842_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/43/2680843_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/37/2680837_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/40/2680840_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/41/2680841_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/39/2680839_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/38/2680838_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
                <SwiperSlide><img src="http://tong.visitkorea.or.kr/cms/resource/35/2680835_image2_1.jpg" alt="none" className="swiper-img-size-fix" /></SwiperSlide>
            </Swiper>

            <div className="detail-info-container">
                <ul className="text-info-box">
                    <li className="info-type-name">소개</li>
                    <li className="detail-info">* 코로나-19 감염 및 확산을 방지하고자 경복궁 및 칠공 '해설관람' 별도 공지시까지 잠정중지 경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 '북궐'이라 불리기도 했다. 경복궁은 5대 궁궐 가운데 으뜸의 규모와 건축미를 자랑한다. 경복궁 근정전에서 즉위식을 가진 왕들을 보면 제2대 정종, 제4대 세종, 제6대 단종, 제7대 세조, 제9대 성종, 제11대 중종, 제13대 명종 등이다. 경복궁은 임진왜란 때 상당수의 건물이 불타 없어진 아픔을 갖고 있으며, 고종 때에 흥선대원군의 주도 아래 7,700여칸에 이르는 건물들을 다시 세웠다. 그러나 또 다시 명성황후 시해사건이 일어나면서 왕조의 몰락과 함께 경복궁도 왕궁으로서의 기능을 상실하고 말았다. 경복궁에는 조선시대의 대표적인 건축물인 경회루와 향원정의 연못이 원형대로 남아 있으며, 근정전의 월대와 조각상들은 당시의 조각미술을 대표한다. 현재 흥례문 밖 서편에는 국립고궁 박물관이 위치하고 있고, 경복궁 내 향원정의 동편에는 국립민속 박물관이 위치하고 있다.<br /><br />* 주요문화재 <br />1) 사적 경복궁<br />2) 국보 경복궁 근정전<br />3) 국보 경복궁 경회루<br />4) 보물 경복궁 자경전<br />5) 보물 경복궁 자경전 십장생 굴뚝<br />6) 보물 경복궁 아미산굴뚝<br />7) 보물 경복궁 근정문 및 행각<br />8) 보물 경복궁 풍기대<br /></li>
                    <li className="info-type-name">주소</li>
                    <li className="detail-info">서울특별시 종로구 사직로 161</li>
                    <Map />
                    <li className="info-type-name">홈페이지</li>
                    <li className="detail-info">경복궁 <a href="http://www.royalpalace.go.kr/" target="_blank" title="새창 : 경복궁 홈페이지로 이동" rel="noreferrer">http://www.royalpalace.go.kr</a></li>
                </ul>

            </div>
        </>
    );
}

export default DetailInfo;