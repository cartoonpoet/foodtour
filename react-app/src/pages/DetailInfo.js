import React from "react";
import "./DetailInfo.css";
import queryString from "query-string";

function DetailInfo({ location }) {
    const query = queryString.parse(location.search);
    console.log(query);

    return (
        <>
            fdssdf
        </>
    );
}

export default DetailInfo;