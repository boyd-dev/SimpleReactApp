import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../redux/actions";

import "../css/bootstrap/css/bootstrap.min.css";

// 로그인 후 프론트엔드 애플리케이션 초기화
//
const LoadingContainer = ({signIn, children}) => {
    
    const initialized = useSelector((state) => state.initialized);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (signIn) {
            dispatch(signInSuccess({}));
        }
    }, []);
    
    const handleSignin = () => {
        window.location.href = "/";
    }
    
    //TODO
    // JWT 만료 후에 다시 로그인
    return (
        (!initialized)?
           <div style={{marginTop: "20px"}}>
               <button type="button" className="btn btn-primary" onClick={handleSignin}>Need to sign in</button>
           </div>
           :
           children
    )
}

export default LoadingContainer;
