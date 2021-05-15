import React, {useEffect} from "react";
import { ButtonLogout, TopLayout, MainLayout, MenuLayout } from "../layouts";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

import { List, ReadAndModify, Write } from "./board";
import { getUser } from "../redux/actions";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

const Main = ({handleLogout, user}) => {
    
    const dispatch = useDispatch();
    
    //사용자 정보를 스토어에 저장하기
    useEffect(() => {
        if (!isEmpty(user)) {
            dispatch(getUser(user));
        }
    }, [user]);
   
    return (
        <div>
            <Router>
                <TopLayout>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div>
                            {
                                <b>Hello, {user.userName}!😉</b>
                            }
                        </div>
                    </div>
                    <MenuLayout>
                        <Link to="/">🏡 메인</Link>
                        <Link to="/app/list">📝 게시판</Link>
                        <a href={"/"}>메뉴2</a>
                        <a href={"/"}>메뉴3</a>
                    </MenuLayout>
                    <div style={{marginRight: "20px", paddingTop: "5px"}}>
                        <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
                    </div>
                </TopLayout>
                <MainLayout>
                    <Switch>
                        <Route path="/app/list"  component={List} />
                        <Route path="/app/read"  component={ReadAndModify} />
                        <Route path="/app/write" component={Write} />
                    </Switch>
                </MainLayout>
            </Router>
        </div>
       
    )
}

export default Main;


