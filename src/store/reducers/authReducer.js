const authState = {
    loading: true,
    authenticate : false,
    error : ' ',
    successMessage : ' '
}

export const authReducer = ( state = authState, action ) => {
    const { payload, type } = action;
    return state;
}