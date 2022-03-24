import { FRIENDS_GET_SUCCESS, MESAGE_GET_SUCCESSS, MESSAGE_SEND_SUCCESS } from "../types/messengerTypes";

const messengerState = {
    friends: [],
    message: []
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

    if (type === MESAGE_GET_SUCCESSS) {
        return {
            ...state,
            message: payload.message
        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    }

    return state;
} 