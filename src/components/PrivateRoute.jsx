import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const { authenticate, successMessage } = useSelector(state => state.auth);
    let location = useLocation();

    if (authenticate) {
        return children;
    }

    // if (authenticate && successMessage === 'Successfully Login') {
    //     return children;
    // } else if (authenticate && successMessage === 'Successfully Registered') {
    //     return <Navigate to="/login" state={{ from: location }} />
    // } else if (!authenticate) {
    //     return <Navigate to="/register" state={{ from: location }} />
    // };

    return <Navigate to="/login" state={{ from: location }} />
};

export default PrivateRoute;