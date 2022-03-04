import axios from 'axios';

export const userRegister = (data) => {
    
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('registered-user', data, config);
        } catch (error) {
            console.log(error.response.data)
        }
    }
}