import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-native';

const AuthorizedRoute = (props) => {
    const isUserLoggedIn = useSelector(state => !!state.account.account);
    
    if (!isUserLoggedIn) {
        return <Route {...props} component={() => <Redirect exact to="/" />} />
    }

    return <Route {...props} />
}

export default AuthorizedRoute;