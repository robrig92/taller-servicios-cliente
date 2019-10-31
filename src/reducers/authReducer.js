import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGOUT_ERROR,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_REQUEST
} from '../actions/actions';

export function auth(
    state = {
        token: '',
        user: null,
        requestStatus: 'loading',
        errors: []
} , action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus,
                user: null,
                token: ''
            }
            // No break
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.access_token,
                user: action.payload.user
            }
            // No break
        case AUTH_LOGIN_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus,
                token: '',
                user: null
            }
            // No break
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            }
        // No break
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...state,
                token: '',
                user: null
            }
        // No break
        case AUTH_LOGOUT_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            }
        // No break
        default:
            return state;
            // No break
    }
}