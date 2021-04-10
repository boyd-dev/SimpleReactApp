
export const getCookie = (name) => {
    const search = name + "=";
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        let offset = document.cookie.indexOf(search);
        let end = 0;
        if (offset !== -1) { // 쿠키가 존재하면
            offset += search.length;
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end === -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
    return null;
}
