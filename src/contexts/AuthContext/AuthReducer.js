import AuthActionType from './AuthConstant';

export const INIT_AUTH = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
};

/**
 *
 * @param {*} state
 * @param {{type: String, payload}} action
 */
function authReducer(state, action) {
    switch (action.type) {
        case AuthActionType.LOGIN_START: {
            return {
                ...state,
                isFetching: true,
            };
        }
        case AuthActionType.LOGIN_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                user: action.payload,
            };
        }
        case AuthActionType.LOGIN_FAILURE: {
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true,
            };
        }

        case AuthActionType.LOGOUT: {
            return {
                ...state,
                user: null,
                isFetching: false,
                error: false,
            };
        }

        default: {
            throw new Error('Invalid action type!');
        }
    }
}

export default authReducer;
