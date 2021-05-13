import React from "react";

// bootstrap-3.3.7-dist
import Pagination from "react-js-pagination";
import "../css/bootstrap/css/bootstrap.min.css";

const PageNavi = ({activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange}) => {
    
    return (
        <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={onPageChange}
        />
    );
}

export default PageNavi;
