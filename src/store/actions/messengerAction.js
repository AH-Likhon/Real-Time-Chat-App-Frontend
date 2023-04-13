import axios from "axios"
import { DELIVERED_SMS, FRIENDS_GET_SUCCESS, GET_THEME, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SEEN_SMS, SET_THEME, UPDATE } from "../types/messengerTypes";


// <-------------------------- Get All Friends Action --------------------------> // 

export const getFriends = () => async (dispatch) => {
    try {
        const response = await axios.get("https://real-time-chat-backend.onrender.com/get-friends");
        // console.log(response.data.friends);
        dispatch({
            type: FRIENDS_GET_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })
    } catch (error) {
        // console.log(error.response.data);
    }
}

// <------------------------- Message Inser/Send Action -------------------------> //

export const messageSend = data => async (dispatch) => {
    // console.log(data);
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post("https://real-time-chat-backend.onrender.com/send-message", data, config);
        // console.log(response.data);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: response.data.message,
            }
        })
    } catch (error) {
        // console.log(error)
        // console.log(error.response?.data)
    }
}


// <-------------------------- Get All Message Action --------------------------> //

export const getMessage = (frndId, myId) => {
    return async dispatch => {
        // console.log(id);
        try {
            const response = await axios.get("https://real-time-chat-backend.onrender.com/get-message");
            // console.log(response.data.getAllMessage);

            // const getAllMessage = response.data.getAllMessage.filter(m => (m.senderId === myId && m.receiverId === frndId) || (m.senderId === frndId && m.receiverId === myId));

            // console.log(getAllMessage);

            dispatch({
                type: MESSAGE_GET_SUCCESS,
                payload: {
                    message: response.data.getAllMessage,
                }
            });

        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

// <------------------------ Image SMS Send/Insert Action -----------------------> //

export const imgMessageSend = (data) => async (dispatch) => {

    const config = {
        headers: {
            // 'content-type': 'multipart/form-data'
            'content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post('https://real-time-chat-backend.onrender.com/image-message', data, config);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: response.data.message
            }
        })
    } catch (error) {
        // console.log(error.response.data)
    }

}

// <------------------------------ Seen SMS Action ------------------------------> //

export const seenSMS = (sms) => async (dispatch) => {
    // console.log(sms);
    try {
        // let lsms = { ...sms, status: 'seen' }
        await axios.put('https://real-time-chat-backend.onrender.com/seen-sms', sms);
        // console.log(res);
        await axios.get("https://real-time-chat-backend.onrender.com/get-message");

        dispatch({
            type: SEEN_SMS,
            payload: {
                sms: sms,
            }
        });
    } catch (error) {
        // console.log(error)
    }
}

// <--------------------------- Delivered SMS Action ----------------------------> //

export const deliveredSMS = (sms) => async (dispatch) => {
    // console.log(sms);
    try {
        // let lsms = { ...sms, status: 'delivered' }
        await axios.put('https://real-time-chat-backend.onrender.com/seen-sms', sms);
        // console.log(res);
        await axios.get("https://real-time-chat-backend.onrender.com/get-message");

        dispatch({
            type: DELIVERED_SMS,
            payload: {
                sms: sms,
            }
        });
    } catch (error) {
        // console.log(error)
    }
};


// <--------------------- Update Unseen to Seen SMS Action ----------------------> //

export const updateSeenSMSRes = (sms) => async (dispatch) => {
    // console.log(sms);
    try {
        // let lsms = { ...sms, status: 'delivered' }
        await axios.put('https://real-time-chat-backend.onrender.com/seen-sms', sms);
        // console.log(res);
        await axios.get("https://real-time-chat-backend.onrender.com/get-message");

        dispatch({
            type: UPDATE,
            payload: {
                sms: sms,
            }
        });
    } catch (error) {
        // console.log(error)
    }
}

// <----------------------- Theme Dark/White Initial Action ---------------------> //

export const getTheme = () => async dispatch => {
    const theme = localStorage.getItem('theme');

    dispatch({
        type: GET_THEME,
        payload: {
            theme: theme ? theme : 'white'
        }
    })
}

// <------------------------------ Theme Change Action --------------------------> //

export const themeSet = themeVal => async dispatch => {
    localStorage.setItem('theme', themeVal);

    dispatch({
        type: SET_THEME,
        payload: {
            theme: themeVal
        }
    })
}
