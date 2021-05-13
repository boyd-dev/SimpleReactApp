import * as ACTIONS from "../actions";


function appReducer(state, action) {

    switch (action.type) {
    
        case ACTIONS.SIGN_IN_SUCCESS:
        
            return Object.assign({}, state, {
                initialized: true
            });
    
        case ACTIONS.SIGN_IN_FAILED:
            
            return Object.assign({}, state, {
                initialized: false,
                pending: false
            });
        
        case ACTIONS.GET_LIST:

            return Object.assign({}, state, {
                pending: true
            });
    
        case ACTIONS.GET_LIST_OK:
        
            return Object.assign({}, state, {
                response: action.response,
                pending: false
            });
    
        case ACTIONS.READ_POST:
        
            return Object.assign({}, state, {
                //pending: true
                response: action.payload,
                pageNo: action.payload.pageNo
            });
            
        // case ACTIONS.READ_POST_OK:
        //
        //     return Object.assign({}, state, {
        //         pending: false
        //     });
    
        case ACTIONS.SAVE_POST:
        
            return Object.assign({}, state, {
                pending: true
            });
    
        case ACTIONS.SAVE_POST_OK:
        
            return Object.assign({}, state, {
                response: action.response,
                pending: false
            });
    
        case ACTIONS.DELETE_POST:
        
            return {...state, pending: true};
            
        case ACTIONS.DELETE_POST_OK:
        
            return {...state, response: action.response, pending: false};
    
        case ACTIONS.MODIFY_POST:
        
            return {...state, pending: true};
            
            
        case ACTIONS.GET_USER:
            
            return {...state, user: action.payload}
    
        default:
            return state;
    }
};

export default appReducer;
