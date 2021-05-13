/**
 * 스토어에 정의되는 상태
 * response    백엔드 서버로부터 받은 응답 데이터
 * initialized 인증성공후 애플리케이션 초기화 성공여부
 * pending     백엔드 API 호출 후 spinning 컴포넌트 표시여부
 * user        사용자 정보
 * pageNo      현재 페이지
 *
 */

export const defaultState = {
    
    response: {},
    initialized: false,
    pending: false,
    user: {},
    pageNo: 1
}

