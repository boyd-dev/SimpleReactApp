import React, {Fragment} from "react";
import styled from "styled-components";
import { ModalOverlay, ModalWrapper, Center} from "../layouts/Modal";

const Box = styled(Center)`
    width: 300px;
    background-color: white;
    padding: 20px;
`

const MessageBox = ({flag, msg, handleButton}) => {
    
    return (
        <Fragment>
            <ModalOverlay visible={flag}/>
            <ModalWrapper visible={flag}>
                <Box>
                    <div style={{marginBottom: '10px'}}>{msg}</div>
                    <div>
                        <button className="btn btn-primary" onClick={handleButton.close}>닫기</button>
                        {' '}
                        {(handleButton.ok !== undefined)?
                            <button className="btn btn-danger" onClick={handleButton.ok}>실행</button>
                            :null
                        }
                    </div>
                </Box>
            </ModalWrapper>
        </Fragment>
    )
}

export default MessageBox;
