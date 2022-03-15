import axios from 'axios';
import { REGISTER_FAIL } from '../types/authType';
// import {
//     REGISTER_FAIL,
//     REGISTER_SUCCESS,
//     USER_LOGIN_SUCCESS,
//     USER_LOGIN_FAIL
// } from "../types/authType";

export const userRegister = (data) => {
    return async (dispatch) => {
        // console.log(data);
        // const formData = { };
        // data.forEach(el => console.log(el));

        // console.log(formData);


        fetch('users', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                console.log("Success:")
            }
            else{
                console.log('Error:', data.error);
            }
            console.log(data);
        })

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/josn'
        //     }
        // }
        // try {
        //     const response = await axios.post('users', data, config);
        //     console.log(response.data);

        //     // localStorage.setItem('authToken', response.data.token);

        //     // dispatch({
        //     //     type: REGISTER_SUCCESS,
        //     //     payload: {
        //     //         successMessage: response.data.successMessage,
        //     //         token: response.data.token
        //     //     }
        //     // })

        // } catch (error) {
        //     // dispatch({
        //     //     type: REGISTER_FAIL,
        //     //     payload: {
        //     //         error: error.response.data.error.errorMessage
        //     //     }
        //     // })
        //     console.log(error);
        // }
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