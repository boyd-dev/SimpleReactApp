// AG-GRID
// https://www.ag-grid.com/

import { DateFormatter } from "../utils/DateTimeUtils";

// 기본형 게시판 컬럼
const gridBoardOptions1 = {
    columnDefs: [
        {headerName: "번호",  width: 100,  field: "cnttId"},
        {headerName: "제목",  width: 700, field: "cnttTitle", cellStyle: {textAlign: "left", cursor: "pointer"}},
        {headerName: "작성자", width: 200, field: "userName"},
        {headerName: "작성일시", width: 200, field: "insDt", valueFormatter: DateFormatter },
        {headerName: "조회수", width: 100, field: "cnttHit", type: "numericColumn"}
    ],
    defaultColDef:{sortable:true, resizable: true},
    rowData: [],
    rowSelection: 'single',
    
}



// 컬럼 레이아웃이 다른 게시판이 있는 경우는 해당 게시판 맞게 새로운 그리드 옵션을 정의
/*
const gridBoardOptions2 = {

}
*/

const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
    
}

export {
    gridBoardOptions1,
    onGridReady
};
