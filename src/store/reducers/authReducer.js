import { REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from "../types/authType";

const authState = {
    loading: true,
    authenticate : false,
    error : ' ',
    successMessage : ' ',
    myInfo: ''
}

// const [ token, setToken ] = React.useState()

export const authReducer = ( state = authState, action ) => {
    const { payload, type } = action;
    
    // fetch(`users/${payload?.token.email}`)
    //         .then(res => res.json())
    //         .then(data => data)

    const getToken = JSON.parse(localStorage.getItem('authToken'));
    // console.log(getToken);
    if(getToken){
        authState.loading= false;
        authState.authenticate = true;
        authState.myInfo = getToken
    }


    if( type === REGISTER_FAIL ){
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            loading: true,
            myInfo: ''
        }
    }

    if( type === REGISTER_SUCCESS ){

       return {
        ...state,
        myInfo: payload.token,
        successMessage: payload.successMessage,
        error: '',
        authenticate: true,
        loading: false
       }
    }

    if( type === SUCCESS_MESSAGE_CLEAR){
        return {
         ...state,
         successMessage: ''
        }
    }

    if( type === ERROR_CLEAR ){
        return {
         ...state,
         error: ''
        }
    }

    return state;
}