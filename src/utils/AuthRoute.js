import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
    const { user } = useContext(AuthContext);
    console.log(user)

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default AuthRoute;