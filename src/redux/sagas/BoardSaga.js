import axios from 'axios';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import {DEV_API_HOST_URL} from "../../utils/ConstUtils";
import * as ACTIONS from "../actions";

function* getList(action) {
    
    // 현재 스토어의 상태
    //const state = yield select();
    
    try {
        const response = yield call(axios.post, `${DEV_API_HOST_URL}/api/board/listPage`, action.payload);
        console.log(response);
        yield put(ACTIONS.getListOk(response));

    } catch (error) {
        // TODO 에러 처리는?
        console.log("API CALL FAILED::LIST");
        //yield put();
    }
}

function* getRead(action) {
    // 이미 데이터를 가지고 있으므로 게시글에 대한 API 호출이 필요하지 않을 것 같다.
    yield put(ACTIONS.getReadOk(action.payload));
    
    //조회수 증가
    yield put(ACTIONS.getReadCountCall(action.payload));
}

function* updateReadCount(action) {
    
    try {
        yield call(axios.post, `${DEV_API_HOST_URL}/api/board/updateReadCount`, action.payload);
        
    } catch (error) {
        // TODO 에러 처리는?
        console.log("API CALL FAILED::COUNT");
        //yield put();
    }
}

function* getSave(action) {
    try {
        const response = yield call(axios.post, `${DEV_API_HOST_URL}/api/board/save`, action.payload);
        console.log(response);
        yield put(ACTIONS.savePostOk(response));
        
    } catch (error) {
        // TODO 에러 처리는?
        console.log("API CALL FAILED::SAVE");
        //yield put();
    }
}

function* getRemove(action) {
    
    try {
        const response = yield call(axios.post, `${DEV_API_HOST_URL}/api/board/delete`, action.payload);
        console.log(response);
        yield put(ACTIONS.deletePostOk(response));
        
    } catch (error) {
        // TODO 에러 처리는?
        console.log("API CALL FAILED::DELETE");
        //yield put();
    }
}

function* getModify(action) {
    try {
        const response = yield call(axios.post, `${DEV_API_HOST_URL}/api/board/update`, action.payload);
        console.log(response);
        yield put(ACTIONS.savePostOk(response));
        
    } catch (error) {
        // TODO 에러 처리는?
        console.log("API CALL FAILED::UPDATE");
        //yield put();
    }
}


function* getListSaga() {
    yield takeLatest(ACTIONS.GET_LIST_CALL, getList);
}

function* getSaveSaga() {
    yield takeLatest(ACTIONS.SAVE_POST_CALL, getSave);
}

function* getReadSaga() {
    yield takeLatest(ACTIONS.READ_POST, getRead);
}

function* getReadCountSaga() {
    yield takeLatest(ACTIONS.READ_COUNT_CALL, updateReadCount);
}

function* getRemoveSaga() {
    yield takeLatest(ACTIONS.DELETE_POST_CALL, getRemove);
}

function* getModifySaga() {
    yield takeLatest(ACTIONS.MODIFY_POST_CALL, getModify);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    getListSaga,
    getReadSaga,
    getReadCountSaga,
    getSaveSaga,
    getRemoveSaga,
    getModifySaga
];

