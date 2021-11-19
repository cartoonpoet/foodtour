import React, { useRef, useEffect } from "react";



function Map(props) {
    const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

    useEffect(() => {
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(parseFloat(props.mapy), parseFloat(props.mapx)), //지도의 중심좌표.
            level: 3, //지도의 레벨(확대, 축소 정도)
        };
        const imageSrc = 'http://pngimg.com/uploads/gps/gps_PNG66.png',
            imageSize = new window.kakao.maps.Size(64, 64),
            imageOption = { offset: new window.kakao.maps.Point(27, 69) };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        const map = new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
        let marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(parseFloat(props.mapy), parseFloat(props.mapx)),
            image: markerImage
        });
        marker.setMap(map);
        return () => { };
    }, [props.mapx, props.mapy]);

    return (
        <div
            className="map"
            style={{ width: "90%", height: "300px", margin: "0 auto" }}
            ref={container}
        ></div>
    );
}

export default Map;