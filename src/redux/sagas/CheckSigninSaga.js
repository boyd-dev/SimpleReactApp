
import {takeLatest, put} from "redux-saga/effects";
import * as ACTIONS from "../actions";
import { getCookie } from "../../utils/CookieUtils";


function* checkSignin(action) {
    
    // 로그인 상태인지 쿠키를 확인
    const v = getCookie("foo-app-jwt-flag");
    if (JSON.parse(v) === true) {
        
        console.log("JWT exists");
        
        switch (action.type) {
            case ACTIONS.GET_LIST:
                yield put(ACTIONS.getListCall(action.payload));
                break;
        
            case ACTIONS.SAVE_POST:
                yield put(ACTIONS.savePostCall(action.payload));
                break;
                
            case ACTIONS.DELETE_POST:
                yield put(ACTIONS.deletePostCall(action.payload));
                break;
    
            case ACTIONS.MODIFY_POST:
                yield put(ACTIONS.modifyPostCall(action.payload));
                break;
        
            default:
                return;
        }
        
    } else {
        console.log("JWT is missing");
        yield put(ACTIONS.signInFailed());
    }
    
    
}

function* getCheckSigninSaga() {
    // TODO
    //  백엔드 API 호출을 하는 모든 액션에 대해 호출 전 검사!
    yield takeLatest(ACTIONS.GET_LIST, checkSignin);
    yield takeLatest(ACTIONS.SAVE_POST, checkSignin);
    yield takeLatest(ACTIONS.READ_POST, checkSignin);
    yield takeLatest(ACTIONS.DELETE_POST, checkSignin);
    yield takeLatest(ACTIONS.MODIFY_POST, checkSignin);
    
}


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    getCheckSigninSaga
];
