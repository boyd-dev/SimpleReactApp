import {DEV_API_HOST_URL} from "../utils/ConstUtils";

const editorConfiguration = {
    image: {
        styles: ['alignLeft', 'alignCenter', 'alignRight']
    },
    
    toolbar: [ 'heading', 'bold', 'italic', '|',
        'bulletedList', 'numberedList', 'blockquote', 'link', 'code', 'codeblock', '|',
        'imageupload', 'imagestyle:alignLeft', 'imagestyle:alignCenter', 'imagestyle:alignRight', '|',
        'undo', 'redo'],
    
    simpleUpload: {
        uploadUrl: `${DEV_API_HOST_URL}/api/board/imageupload`,
    }
};

export {
    editorConfiguration
};
