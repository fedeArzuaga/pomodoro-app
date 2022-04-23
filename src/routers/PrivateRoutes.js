import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export const PrivateRoutes = ({ children }) => {

    const { auth } = useSelector( state => state );

    // console.log( auth.isLoggedIn );

    return auth.isLoggedIn
        ? children
        : <Navigate to="/auth/login" />
}
