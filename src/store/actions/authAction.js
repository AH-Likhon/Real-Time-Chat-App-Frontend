import axios from 'axios';
// import { dispatch } from 'react-hot-toast/dist/core/store';
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../types/authType';
// import {
//     REGISTER_FAIL,
//     REGISTER_SUCCESS,
//     USER_LOGIN_SUCCESS,
//     USER_LOGIN_FAIL
// } from "../types/authType";

export const userRegister = (data) => {

    return async dispatch => {
        console.log(data);
        // const formData = { };
        // data.forEach(el => console.log(el));

        // console.log(formData);

        // let { email } = data;

        // const token = data;

        // let authToken = new Array();

        // fetch('http://localhost:5000/users', {
        //     method: 'POST',
        //     headers: { "content-type": "application/json" },
        //     body: JSON.stringify(data),
        // })
        // .then(res => res.json())
        // .then(data => {
        //     if(data.insertedId){
        //         console.log("Success:", data);

        //         // let authToken = JSON.parse(localStorage.getItem("authToken")) ? JSON.parse(localStorage.getItem("authToken")) : [];

        //         // authToken.push(token);

        //         localStorage.setItem('authToken', JSON.stringify(token));

        //         // let setToken;

        //         // fetch(`users/${token.email}`)
        //         // .then(res => res.json())
        //         // .then(data => {
        //         //     if(new Date() > data.expires){
        //         //         setToken = { };
        //         //     }else{
        //         //         setToken = data;
        //         //     }
        //         // })

        //         dispatch({
        //             type: REGISTER_SUCCESS,
        //             payload: {
        //                 successMessage: 'Successfully registered',
        //                 token: token
        //             }
        //         })
        //     }
        //     else{
        //         console.log('Error:', data.error);
        //         dispatch({
        //             type: REGISTER_FAIL,
        //             payload: {
        //                 error: data.error
        //             }
        //         })
        //     }
        //     // console.log(JSON.parse(data));
        // })

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const response = await axios.post('http://localhost:5000/users', data, config);

            const res = await axios.post('http://localhost:5000/user-login', data, config);
            
            console.log(response.data);

            if(response.data.error){
                dispatch({
                    type: REGISTER_FAIL,
                    payload: {
                        error: response.data.error
                    }
                })
            }

            if(response.data.successMessage){
                localStorage.setItem('authToken', response.data.token);

                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        successMessage: response.data.successMessage,
                        token: response.data.token
                    }
                })
            }


        } catch (error) {
            // dispatch({
            //     type: REGISTER_FAIL,
            //     payload: {
            //         error: error.response.data.error.errorMessage
            //     }
            // })
            console.log(error);
        }
    }
}

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
            const response = await axios.post('http://localhost:5000/user-login', data, config);
            
            // response.set("Access-Control-Allow-Origin", "*");
            console.log(response.data);

            if(response.data.error){
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload: {
                        error: response.data.error
                    }
                })
            }

            if(response.data.successMessage){
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
            console.log(error)
        }
    }
}

// export const userLogin = (data) => {
//     return async (dispath) => {

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         try {
//             const response = await axios.post('/api/messenger/user-login', data, config);
//             localStorage.setItem('authToken', response.data.token);
//             dispath({
//                 type: USER_LOGIN_SUCCESS,
//                 payload: {
//                     successMessage: response.data.successMessage,
//                     token: response.data.token
//                 }
//             })
//         } catch (error) {
//             dispath({
//                 type: USER_LOGIN_FAIL,
//                 payload: {
//                     error: error.response.data.error.errorMessage
//                 }
//             })
//         }
//     }
// }

// export const userLogout = ()=>async(dispatch)=>{
//     try {
//         const response = await axios.post('/api/messenger/user-logout');
//         if(response.data.success){
//             localStorage.removeItem('authToken');
//             dispatch({
//                 type : 'LOGOUT_SUCCESS',
//             })
//         }
//     } catch (error) {
        
//     }
// }