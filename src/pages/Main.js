import React from 'react';
import {Button, TopLayout, MainLayout} from "../layouts";


const Main = ({handleLogout, nickname}) => {
    
    return (
        <div>
            <TopLayout>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div>
                        <b>Hello, {nickname}!😉</b>
                    </div>
                    
                </div>
                <div style={{marginRight: "20px", paddingTop: "10px"}}>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </TopLayout>
            <MainLayout>
                Main section
            </MainLayout>
        </div>
       
    )
}

export default Main;


