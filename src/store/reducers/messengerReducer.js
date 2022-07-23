import { DELIVERED_SMS, FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SEEN_SMS, SOCKET_MESSAGE, UPDATE, UPDATE_FRND_SMS } from "../types/messengerTypes";

const messengerState = {
    friends: [],
    message: [],
    // allMessage: []
    // smsSendSuccess: false
}

export const messengerReducer = (state = messengerState, action) => {
    const { type, payload } = action;

    // console.log(payload)

    if (type === FRIENDS_GET_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    if (type === MESSAGE_GET_SUCCESS) {
        return {
            ...state,
            message: payload.message,
            // message: payload.allMessage,
            // allMessage: payload.allMessage,
            // lastSMS: payload.lastSMS
        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            // smsSendSuccess: true,
            message: [...state.message, payload.message],
        }
    }

    if (type === SOCKET_MESSAGE) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    }

    if (type === SEEN_SMS) {

        console.log(state.message.findIndex(m => m.uid === payload.sms.uid));
        const index = state.message.findIndex(m => m.uid === payload.sms.uid);

        if (index !== -1) {
            state.message[index] = payload.sms;
            // console.log(state.message);
            return {
                ...state
                // message: [...state.message]
            };
        }
        // else {
        //     console.log(state.message);
        //     return state;
        // }
    }

    if (type === DELIVERED_SMS) {

        console.log(state.message.findIndex(m => m.uid === payload.sms.uid));
        const index = state.message.findIndex(m => m.uid === payload.sms.uid);

        if (index !== -1) {
            state.message[index] = payload.sms;
            // console.log(state.message);
            return {
                ...state
                // message: [...state.message]
            };
        }
        // else {
        //     console.log(state.message);
        //     return {
        //         ...state,
        //         message: [...state.message, payload.sms]
        //     };
        // }
    }

    if (type === UPDATE) {
        const index = state.message.findIndex(m => m.uid === payload.sms.uid);

        if (index !== -1) {
            state.message[index] = payload.sms;
            console.log(state.message);
            return {
                ...state
            };
        }
    }

    // if (type === DELIVERED_SMS) {
    //     // const seenSms = state.message.filter(m => (m.senderId === payload.sms.senderId && m.receiverId === payload.sms.receiverId) || (m.senderId === payload.sms.receiverId && m.receiverId === payload.sms.senderId));

    //     // console.log(payload.sms);
    //     if (state.message.includes(payload.sms)) {
    //         return {
    //             ...state,
    //             message: [...state.message]
    //         }
    //     } else {
    //         return {
    //             ...state,
    //             message: [...new Set(state.message), payload.sms]
    //         }
    //     }

    // }

    return state;
} 