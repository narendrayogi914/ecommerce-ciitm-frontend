import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticate, user, children }) {
    const location = useLocation();

    // Case 1: User is not authenticated and tries to access a protected route
    if (
        !isAuthenticate &&
        !(location.pathname.includes('/login') || location.pathname.includes('/register'))
    ) {
        return <Navigate to="/auth/login" />;
    }

    // Case 2: User is authenticated but tries to access login or register routes
    if (
        isAuthenticate &&
        (location.pathname.includes('/login') || location.pathname.includes('/register'))
    ) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }

    // Case 3: Non-admin user trying to access admin routes
    if (isAuthenticate && user?.role !== 'admin' && location.pathname.includes('/admin')) {
        return <Navigate to="/unauth-page" />;
    }
    

    // Case 4: All other cases, render children
    return <>{children}</>;
}

export default CheckAuth;
