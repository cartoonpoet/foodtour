import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "./Slider.css";

SwiperCore.use([Pagination, Navigation])

function Slider() {
    return (
        <div className="slider-container">
            <Swiper
                className="banner mySwiper"
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 1000 }}
                loop={true}
            >
                <SwiperSlide>
                    <img src="assets/slider-img/slider1.gif" alt="slider1 img is not" />

                </SwiperSlide>
                <SwiperSlide><img src="assets/slider-img/slider2.png" alt="slider2 img is not" /></SwiperSlide>
                <SwiperSlide><img src="assets/slider-img/slider3.png" alt="slider3 img is not" /></SwiperSlide>
            </Swiper>
        </div >
    );
}

export default Slider;