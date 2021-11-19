import React from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = (props) => {
    return (
        <Pagination
            activePage={props.page}
            itemsCountPerPage={20}
            totalItemsCount={props.totalItemsCount}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={props.handlePageChange}
        />
    );
};

export default Paging;