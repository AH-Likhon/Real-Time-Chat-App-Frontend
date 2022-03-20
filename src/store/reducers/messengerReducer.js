import { FRIENDS_GET_SUCCESS } from "../types/messengerTypes";

const messengerState = {
    friends: []
}

export const messengerReducer = ( state = messengerState, action ) => {
    const { type, payload } = action;

    // console.log(payload)

    if( type === FRIENDS_GET_SUCCESS ){
        return {
            ...state,
            friends: payload.friends
        }
    }

    return state;
} 