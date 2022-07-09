import { FRIENDS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SOCKET_MESSAGE, UPDATE_FRND_SMS } from "../types/messengerTypes";

const messengerState = {
    friends: [],
    message: [],
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

    return state;
} 