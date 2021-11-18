import React from "react";
import "./DetailInfo.css";
import queryString from "query-string";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, {
    Pagination, Navigation
} from 'swiper';


SwiperCore.use([Pagination, Navigation]);

function DetailInfo({ location }) {
    const query = queryString.parse(location.search);
    console.log(query);

    return (
        <>
            <hr className="top-line" />
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
        </>
    );
}

export default DetailInfo;