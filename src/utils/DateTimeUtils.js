// TIMESTAMP 타입을 일자와 시간 형식으로 변환
const DateFormatter = (params) => {
    let s = '-';
    let p = "";
    if (params.data !== undefined) {
        p = params.data
    } else {
        p = params
    }
    
    let d = new Date(p.insDt).toLocaleDateString();
    d = d.substring(0, d.lastIndexOf("."));
    const t = new Date(p.insDt).toLocaleTimeString();
    s = d + " " + t;
    
    return s;
}

export {
    DateFormatter
}
