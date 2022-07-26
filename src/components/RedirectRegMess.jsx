import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RedirectRegMess = ({ children, ...rest }) => {
    const { authenticate } = useSelector(state => state.auth);
    let location = useLocation();

    if (!authenticate) {
        return children;
    };

    return <Navigate to="/messenger" state={{ from: location }} />
};

export default RedirectRegMess;