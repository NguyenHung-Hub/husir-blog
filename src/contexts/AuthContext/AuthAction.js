import AuthActionType from './AuthConstant';

export const loginStart = () => {
    return {
        type: AuthActionType.LOGIN_START,
    };
};
export const loginSuccess = (user) => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        payload: user,
    };
};
export const refreshUser = (user) => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        payload: user,
    };
};
export const loginFailure = () => {
    return {
        type: AuthActionType.LOGIN_FAILURE,
    };
};

export const logout = () => {
    return {
        type: AuthActionType.LOGOUT,
    };
};
