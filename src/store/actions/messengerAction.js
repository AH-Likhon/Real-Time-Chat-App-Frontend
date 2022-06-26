import axios from "axios"
import { FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerTypes";

export const getFriends = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:5000/get-friends");
        // console.log(response.data.friends);
        dispatch({
            type: FRIENDS_GET_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })
    } catch (error) {
        console.log(error.response.data);
    }
}


export const messageSend = data => async (dispatch) => {
    // console.log(data);
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post("http://localhost:5000/send-message", data, config);
        console.log(response.data);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: response.data.message
            }
        })
    } catch (error) {
        console.log(error.response.data)
    }
}

export const getMessage = (frndId, myId) => {
    return async dispatch => {
        // console.log(id);
        try {
            const response = await axios.get("http://localhost:5000/get-message");
            // console.log(response.data.getAllMessage);

            const getAllMessage = response.data.getAllMessage.filter(m =>
                `$or: [
                {
                    $and: [{ senderId: { $eq: m.myId } }, { receiverId: { $eq: m.frndId } }]
                },
                {
                    $and: [{ senderId: { $eq: m.frndId } }, { receiverId: { $eq: m.myId } }]
                }
            ]`
            );

            const getLastMSG = response.data.getAllMessage.filter(m =>
                `$or: [
                {
                    $and: [{ senderId: { $eq: m.myId } }, { receiverId: { $eq: m.frndId } }]
                },
                {
                    $and: [{ senderId: { $eq: m.frndId } }, { receiverId: { $eq: m.myId } }]
                }
            ].sort({ updatedAt: -1 })`
            );

            // const getAllMessage = response.data.getAllMessage.filter(m => (m.senderId === myId && m.receiverId === frndId) || (m.senderId === frndId && m.receiverId === myId));

            // console.log(getAllMessage);

            dispatch({
                type: MESSAGE_GET_SUCCESS,
                payload: {
                    message: getAllMessage,
                    lastSMS: getLastMSG
                }
            });

        } catch (error) {
            console.log(error.response.data);
        }
    }
}


export const imgMessageSend = (data) => async (dispatch) => {

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post('http://localhost:5000/image-message', data, config);
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: response.data.message
            }
        })
    } catch (error) {
        console.log(error.response.data)
    }

}
