import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_ERROR
} from "./actions";
import ApiService from '../helpers/ApiService';

export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
        requestStatus: 'loading'
    }
}

export const authLoginSuccess = (payload) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: payload,
        requestStatus: 'success'
    }
}

export const authLoginError = (errors) => {
    return {
        type: AUTH_LOGIN_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const authLogoutRequest = () => {
    return {
        type: AUTH_LOGOUT_REQUEST,
        requestStatus: 'loading'
    }
}

export const authLogoutSuccess = (payload) => {
    return {
        type: AUTH_LOGOUT_SUCCESS,
        payload: payload,
        requestStatus: 'success'
    }
}

export const authLogoutError = (errors) => {
    return {
        type: AUTH_LOGOUT_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const authLogin = (credentials) => {
    return dispatch => {
        dispatch(authLoginRequest());
        
        return ApiService.post('/auth/login', credentials)
            .then((response) => {
                let data = response.data;
                dispatch(authLoginSuccess(data));
            }).catch((error) => {
                dispatch(authLoginError(error.response));
            })
    }
}