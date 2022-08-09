import axios from "axios"
import { DELIVERED_SMS, FRIENDS_GET_SUCCESS, GET_THEME, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SEEN_SMS, SET_THEME, UPDATE } from "../types/messengerTypes";

export const getFriends = () => async (dispatch) => {
    try {
        const response = await axios.get("https://fierce-bastion-47070.herokuapp.com/get-friends");
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


export const messageSend = data => async (dispatch) => {
    // console.log(data);
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post("https://fierce-bastion-47070.herokuapp.com/send-message", data, config);
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
            const response = await axios.get("https://fierce-bastion-47070.herokuapp.com/get-message");
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
            // 'content-type': 'multipart/form-data'
            'content-type': 'application/json'
        }
    }

    try {
        const response = await axios.post('https://fierce-bastion-47070.herokuapp.com/image-message', data, config);
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
        // let lsms = { ...sms, status: 'seen' }
        await axios.put('https://fierce-bastion-47070.herokuapp.com/seen-sms', sms);
        // console.log(res);
        await axios.get("https://fierce-bastion-47070.herokuapp.com/get-message");
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
        // let lsms = { ...sms, status: 'delivered' }
        await axios.put('https://fierce-bastion-47070.herokuapp.com/seen-sms', sms);
        // console.log(res);
        await axios.get("https://fierce-bastion-47070.herokuapp.com/get-message");

        dispatch({
            type: DELIVERED_SMS,
            payload: {
                sms: sms,
            }
        });
    } catch (error) {
        console.log(error)
    }
};

export const updateSeenSMSRes = (sms) => async (dispatch) => {
    // console.log(sms);
    try {
        // let lsms = { ...sms, status: 'delivered' }
        await axios.put('https://fierce-bastion-47070.herokuapp.com/seen-sms', sms);
        // console.log(res);
        await axios.get("https://fierce-bastion-47070.herokuapp.com/get-message");

        dispatch({
            type: UPDATE,
            payload: {
                sms: sms,
            }
        });
    } catch (error) {
        console.log(error)
    }
}


export const getTheme = () => async dispatch => {
    const theme = localStorage.getItem('theme');

    dispatch({
        type: GET_THEME,
        payload: {
            theme: theme ? theme : 'white'
        }
    })
}

export const themeSet = themeVal => async dispatch => {
    localStorage.setItem('theme', themeVal);

    dispatch({
        type: SET_THEME,
        payload: {
            theme: themeVal
        }
    })
}
