import { LOGOUT_SUCCESS } from "../types/authType";
import { DELIVERED_SMS, FRIENDS_GET_SUCCESS, GET_THEME, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SEEN_SMS, SET_THEME, SOCKET_MESSAGE, UPDATE } from "../types/messengerTypes";

const messengerState = {
    friends: [],
    message: [],
    themeMode: '',
    add_new_user: ''
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
            message: payload.message
        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    }

    if (type === SOCKET_MESSAGE) {
        return {
            ...state,
            message: [...state.message, payload.message]
        }
    }

    if (type === SEEN_SMS) {

        // console.log(state.message.findIndex(m => m.uid === payload.sms.uid));
        const index = state.message.findIndex(m => m.uid === payload.sms.uid);

        if (index !== -1) {
            state.message[index] = payload.sms;
            // console.log(state.message);
            return {
                ...state
                // message: [...state.message]
            };
        }
    }

    if (type === DELIVERED_SMS) {

        // console.log(state.message.findIndex(m => m.uid === payload.sms.uid));
        const index = state.message.findIndex(m => m.uid === payload.sms.uid);

        if (index !== -1) {
            state.message[index] = payload.sms;
            // console.log(state.message);
            return {
                ...state
                // message: [...state.message]
            };
        }
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

    if (type === GET_THEME || SET_THEME) {
        return {
            ...state,
            themeMode: payload?.theme
        }
    }

    if (type === LOGOUT_SUCCESS) {
        return {
            ...state,
            friends: [],
            message: [],
        }
    };

    if (type === 'ADD_NEW_USER') {
        return {
            ...state,
            add_new_user: payload.add_new_user
        }
    };

    if (type === 'ADD_NEW_USER_CLEAR') {
        return {
            ...state,
            add_new_user: ''
        }
    }

    return state;
} 