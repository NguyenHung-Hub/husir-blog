import React, { createContext, useEffect, useReducer } from 'react';
import authReducer, { INIT_AUTH } from './AuthReducer';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authState, authDispatch] = useReducer(authReducer, INIT_AUTH);
    console.log(`file: AuthProvider.js:8 > AUTH:`, authState);

    useEffect(() => {
        if (authState) {
            localStorage.setItem('user', JSON.stringify(authState.user));
        }
    }, [authState.user]);

    return <AuthContext.Provider value={{ authState, authDispatch }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
