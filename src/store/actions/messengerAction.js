import axios from "axios"
import { DELIVERED_SMS, FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SEEN_SMS } from "../types/messengerTypes";

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
                message: response.data.message,
            }
        })
    } catch (error) {
        console.log(error)
        // console.log(error.response?.data)
    }
}

export const getMessage = (frndId, myId) => {
    return async dispatch => {
        // console.log(id);
        try {
            const response = await axios.get("http://localhost:5000/get-message");
            // console.log(response.data.getAllMessage);

            // const getAllMessage = await response.data.getAllMessage.filter(m =>
            //     `$or: [
            //     {
            //         $and: [{ senderId: { $eq: m.myId } }, { receiverId: { $eq: m.frndId } }]
            //     },
            //     {
            //         $and: [{ senderId: { $eq: m.frndId } }, { receiverId: { $eq: m.myId } }]
            //     }
            // ]`
            // );

            // const getLastMSG = await response.data.getAllMessage.filter(m =>
            //     `$or: [
            //     {
            //         $and: [{ senderId: { $eq: m.myId } }, { receiverId: { $eq: m.frndId } }]
            //     },
            //     {
            //         $and: [{ senderId: { $eq: m.frndId } }, { receiverId: { $eq: m.myId } }]
            //     }
            // ].sort({ updatedAt: -1 })`
            // );

            const getAllMessage = response.data.getAllMessage.filter(m => (m.senderId === myId && m.receiverId === frndId) || (m.senderId === frndId && m.receiverId === myId));


            // const getLastMSG = response.data.getAllMessage.filter((m => (m.senderId === myId && m.receiverId === frndId) || (m.senderId === frndId && m.receiverId === myId))).slice(-1);
            // const getLastMSG = response.data.getAllMessage.findOne((m => (m.senderId === myId && m.receiverId === frndId) || (m.senderId === frndId && m.receiverId === myId))).sort({ updatedAt: -1 });

            // console.log("last SMS", getLastMSG);

            // console.log(getAllMessage);

            dispatch({
                type: MESSAGE_GET_SUCCESS,
                payload: {
                    // message: getAllMessage,
                    message: response.data.getAllMessage,
                    // allMessage: response.data.getAllMessage
                    // lastSMS: getLastMSG
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

export const seenSMS = (sms) => async (dispatch) => {
    // console.log(sms);
    try {
        const res = await axios.put('http://localhost:5000/seen-sms', sms);
        // console.log(res);
        const response = await axios.get("http://localhost:5000/get-message");
        // const value = response.data.getAllMessage.slice(-1)[0].status
        // console.log(response.data.getAllMessage.slice(-1)[0]);
        // const newArr = response.data.getAllMessage.map(object => {
        //     if (object.uid === sms.uid) {
        //         // 👇️ change value of name property
        //         return { ...object, status: 'seen' };
        //     }
        //     return object;
        // });
        // console.log();
        dispatch({
            type: SEEN_SMS,
            payload: {
                sms: sms,
            }
        });


        // console.log(response.data.getAllMessage.slice(-1)[0].status === 'seen');
        // console.log(response.data.getAllMessage.includes(sms));
    } catch (error) {
        console.log(error)
    }
}

export const deliveredSMS = (sms) => async (dispatch) => {
    // console.log(sms);
    try {
        await axios.put('http://localhost:5000/seen-sms', sms);
        // console.log(res);
        await axios.get("http://localhost:5000/get-message");

        dispatch({
            type: DELIVERED_SMS,
            payload: {
                sms: sms,
            }
        });
    } catch (error) {
        console.log(error)
    }
}
