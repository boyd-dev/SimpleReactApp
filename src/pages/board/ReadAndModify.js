import React, {useMemo, useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

import {editorConfiguration} from "../../layouts/EditorOptions";
import {DateFormatter} from "../../utils/DateTimeUtils";
import {deletePost, modifyPost} from "../../redux/actions";
import MessageBox from "../MessageBox";

import "../../css/bootstrap/css/bootstrap.min.css";


const ReadAndModify = ({history}) => {
    
    const state = useSelector((state) => ({response: state.response, user: state.user}));
    const dispatch = useDispatch();
    
    // 삭제하면 response 가 리셋되면서 렌더링이 다시 되는데 이때 데이터가 없으므로 오류가 발생한다.
    // useMemo 를 사용하여 삭제시킨 데이터를 일시적으로 유지하기로 한다. 삭제 후에는 목록으로 이동하므로 문제는 없다.
    const content = useMemo(() => state,[]);
    
    const btnModRef = useRef();
    const btnSaveRef = useRef();
    const btnDelRef = useRef();
    
    const [delFlag, setDelFlag] = useState(false);
    const [modFlag, setModFlag] = useState(false);
    const [editor, setEditor] = useState(null);
    const [title, setTitle] = useState("");
    const [cnttText, setCnttText] = useState(null);
    
    
    useEffect(() => {
        if (state.user.userId === content.response.authorId) {
            btnModRef.current.disabled = false;
            btnSaveRef.current.disabled = true; // 저장은 수정 모드인 경우만 활성화
            btnDelRef.current.disabled = false;
        } else {
            btnModRef.current.disabled = true;
            btnSaveRef.current.disabled = true;
            btnDelRef.current.disabled = true;
        }
    }, [content]);
    
    
    useEffect(() => {
        // 삭제 후 목록으로 이동
        if (state.response.status !== undefined && state.response.status === 200) {
            history.push('/app/list');
        }
    }, [state.response]);
    
    
    const handleList = () => {
        history.push(`/app/list/`);
    }
    
    const handleModify = () => {
        
        //현재 사용자와 글 작성자가 같은 경우에만 수정 가능
        if (state.user.userId === content.response.authorId) {
            btnSaveRef.current.disabled = false;
            editor.isReadOnly = false;
            setModFlag(true);
        } else {
            alert("수정 권한이 없습니다.");
        }
    }
    
    const handleSave = () => {
        
        if (state.user.userId === content.response.authorId) {
            
            const s =  {
                cnttId: content.response.cnttId,
                boardId: content.response.boardId,
                cnttTitle: (title==="")?content.response.cnttTitle:title,
                cnttText: (cnttText===null)?content.response.cnttText:cnttText,
                authorId: content.response.authorId,
                userName: content.response.userName
            };
            dispatch(modifyPost(s));
        }
    }
    
    const handleRemove = () => {
        //현재 사용자와 글 작성자가 같은 경우에만 삭제 가능
        if (state.user.userId === content.response.authorId) {
            setDelFlag(true);
        } else {
            alert("삭제 권한이 없습니다.");
        }
    }
    
    const handleDeleteCancel = () => {
        setDelFlag(false);
    }
    
    const handleDeleteConfirm = () => {
        dispatch(deletePost(state.response));
    }
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    
    const handleEditorChange = (event, edit) => {
        setCnttText(edit.getData());
    }
    
    return (
        <div style={{width: "100%"}}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{width: "60%"}}>
                    <div className="panel panel-default">
                        <div className="panel-body" style={{textAlign: "left"}}>
                            {content.response.userName}
                            <br/>
                            { DateFormatter(content.response) } {' '} <span className="badge">{content.response.cnttHit}</span>
                            <br/><br/>
                            {modFlag?
                                <input type="text" className="form-control" id="title" defaultValue={content.response.cnttTitle} onChange={handleTitleChange}/>
                                : <b>{content.response.cnttTitle}</b>
                            }
                        </div>
                    </div>
                </div>
                <form className="form-inline">
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={handleModify} ref={btnModRef}>Modify</button>{' '}
                        <button type="button" className="btn btn-primary" onClick={handleSave} ref={btnSaveRef}>Save</button>{' '}
                        <button type="button" className="btn btn-warning" onClick={handleRemove} ref={btnDelRef}>Remove</button>{' '}
                        <button type="button" className="btn btn-normal" onClick={handleList}>List</button>
                    </div>
                </form>
            </div>
            <CKEditor editor={ Editor }
                      config={ editorConfiguration }
                      data={content.response.cnttText}
                      onChange={handleEditorChange}
                      onReady={ editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log( 'Editor is ready to use!', editor );
                          editor.isReadOnly = true;
                          setEditor(editor);
                          
                      } }
            />
            <MessageBox flag={delFlag} msg={"삭제하시겠습니까?"} handleButton={{close: handleDeleteCancel, ok: handleDeleteConfirm}}/>
        </div>
    )
}


export default ReadAndModify;


