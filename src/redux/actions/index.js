// 액션 타입
//조회
export const GET_LIST = "GET_LIST";
export const GET_LIST_CALL = "GET_LIST_CALL";
export const GET_LIST_OK = "GET_LIST_OK";

//저장
export const SAVE_POST = "SAVE_POST";
export const SAVE_POST_CALL = "SAVE_POST_CALL";
export const SAVE_POST_OK = "SAVE_POST_OK";

//읽기
export const READ_POST = "READ_POST";
//export const READ_POST_CALL = "READ_POST_CALL";
export const READ_COUNT_CALL = "READ_COUNT_CALL";
export const READ_POST_OK = "READ_POST_OK";

//삭제
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_CALL = "DELETE_POST_CALL";
export const DELETE_POST_OK = "DELETE_POST_OK";

//수정
export const MODIFY_POST = "MODIFY_POST";
export const MODIFY_POST_CALL = "MODIFY_POST_CALL";

//인증성공
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";

//인증실패 또는 JWT 만료
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";

//사용자 기본정보 조회
export const GET_USER = "GET_USER";
//export const GET_USER_CALL = "GET_USER_CALL";
export const GET_USER_OK = "GET_USER_OK";

// 액션 생성 함수
//
export const getList = (params) => ({type: GET_LIST, payload: params});
export const getListCall = (params) => ({type: GET_LIST_CALL, payload: params});
export const getListOk = (response) => ({type: GET_LIST_OK, response});

export const savePost = (params) => ({type: SAVE_POST, payload: params});
export const savePostCall = (params) => ({type: SAVE_POST_CALL, payload: params});
export const savePostOk = (response) => ({type: SAVE_POST_OK, response});

export const getRead = (params) => ({type: READ_POST, payload: params});
//export const getReadCall = (params) => ({type: READ_POST_CALL, payload: params});
export const getReadCountCall = (params) => ({type: READ_COUNT_CALL, payload: params});
export const getReadOk = (response) => ({type: READ_POST_OK, response});

export const deletePost = (params) => ({type: DELETE_POST, payload: params});
export const deletePostCall = (params) => ({type: DELETE_POST_CALL, payload: params});
export const deletePostOk = (response) => ({type: DELETE_POST_OK, response});

export const modifyPost = (params) => ({type: MODIFY_POST, payload: params});
export const modifyPostCall = (params) => ({type: MODIFY_POST_CALL, payload: params});
//수정 후에는 SAVE_POST_OK 를 디스패치하기로 한다.

export const signInSuccess = (params) => ({type: SIGN_IN_SUCCESS, payload: params});
export const signInFailed = () => ({type: SIGN_IN_FAILED});

export const getUser = (params) => ({type: GET_USER, payload: params});
//export const getUserCall = (params) => ({type: GET_USER_CALL, payload: params});
export const getUserOk = (response) => ({type: GET_USER_OK, response});

