import { REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from "../types/authType";
import deCodeToken from 'jwt-decode'

const authState = {
    loading: true,
    authenticate: false,
    error: ' ',
    successMessage: ' ',
    myInfo: ''
}

const tokenDecode = (token) => {
    const tokenDecoded = deCodeToken(token);
    console.log(tokenDecoded);
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
        return null;
    }
    return tokenDecoded;
}

// const [ token, setToken ] = React.useState()

export const authReducer = (state = authState, action) => {
    const { payload, type } = action;

    // fetch(`users/${payload?.token.email}`)
    //         .then(res => res.json())
    //         .then(data => data)

    const getToken = localStorage.getItem('authToken');
    // console.log(getToken);
    if (getToken) {
        authState.loading = false;
        authState.authenticate = true;
        authState.myInfo = getToken
    }




    if (type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
        const myInfo = tokenDecode(payload.token);
        return {
            ...state,
            myInfo: myInfo,
            successMessage: payload.successMessage,
            error: '',
            authenticate: true,
            loading: false
        }
    }

    if (type === REGISTER_FAIL || type === USER_LOGIN_FAIL) {
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            loading: true,
            myInfo: ''
        }
    }

    // if( type === REGISTER_SUCCESS ){

    //    return {
    //     ...state,
    //     myInfo: payload.token,
    //     successMessage: payload.successMessage,
    //     error: '',
    //     authenticate: true,
    //     loading: false
    //    }
    // }



    if (type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            successMessage: ''
        }
    }

    if (type === ERROR_CLEAR) {
        return {
            ...state,
            error: ''
        }
    }

    // if( type === USER_LOGIN_FAIL ){
    //     return {
    //         ...state,
    //         error : payload.error,
    //         authenticate : false,
    //         myInfo : '',
    //         loading : true
    //     }
    // }

    return state;
}