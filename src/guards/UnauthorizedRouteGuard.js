import React from 'react';
import { Navigate  } from "react-router-dom";

export const UnauthorizedRouteGuard = ({ Component, auth, ...rest }) => {
    if (!auth) {
        return <Navigate to='/login' />;
    }

    return (
        <Component {...rest} />
    )
}

export default UnauthorizedRouteGuard;