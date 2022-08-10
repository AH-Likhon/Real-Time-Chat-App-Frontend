import axios from 'axios';
import { LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../types/authType';


// <------------------------------ Registration Action --------------------------> //

export const userRegister = (data) => {

    return async dispatch => {
        // console.log(data);

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const response = await axios.post('https://fierce-bastion-47070.herokuapp.com/users', data, config);

            // console.log(response.data);

            if (response.data.error) {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: {
                        error: response.data.error
                    }
                })
            }

            if (response.data.successMessage) {
                localStorage.setItem('authToken', response.data.token);
                // await axios.post('https://fierce-bastion-47070.herokuapp.com/login', data, config);

                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        successMessage: response.data.successMessage,
                        token: response.data.token
                    }
                })
            }


        } catch (error) {
            // console.log(error);
        }
    }
}

// <------------------------------------ Login Action ---------------------------> //

export const userLogin = (data) => {

    return async dispatch => {

        const config = {
            headers: {
                'content-type': 'application/json',
                // "Access-Control-Allow-Origin": "*",
            }
        }

        // console.log(data);

        try {
            const response = await axios.post('https://fierce-bastion-47070.herokuapp.com/login', data, config);

            // console.log(response.data);

            if (response.data.error) {
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: {
                        error: response.data.error
                    }
                })
            }

            if (response.data.successMessage) {
                localStorage.setItem('authToken', response.data.token);

                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        successMessage: response.data.successMessage,
                        token: response.data.token
                    }
                })
            }

        } catch (error) {
            // console.log(error)
        }
    }
}

// <---------------------------------- Logout Action ----------------------------> //

export const userLogOut = (data) => async (dispatch) => {
    console.log("logout", data);

    try {

        const res = await axios.delete(`https://fierce-bastion-47070.herokuapp.com/logout/${data.id}`);

        // console.log(res.data);
        localStorage.removeItem('authToken');
        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        // console.log(error);
    }
}