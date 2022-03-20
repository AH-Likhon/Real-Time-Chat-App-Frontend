import axios from "axios"
import { FRIENDS_GET_SUCCESS } from "../types/messengerTypes";

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