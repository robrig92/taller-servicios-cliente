import {
    FETCH_PERMISOS_REQUEST,
    FETCH_PERMISOS_SUCCESS,
    FETCH_PERMISOS_ERROR
} from "./actions";
import ApiService from '../helpers/ApiService';

export const fetchPermisosRequest = () => {
    return {
        type: FETCH_PERMISOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchPermisosSuccess = (permisos) => {
    return {
        type: FETCH_PERMISOS_SUCCESS,
        payload: permisos,
        requestStatus: 'success'
    };
}

export const fetchPermisosError = (errors) => {
    return {
        type: FETCH_PERMISOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export function getPermisos() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchPermisosRequest());

        return ApiService.get('/permisos', config)
            .then((response) => {
                let permisos = response.data.data.permisos;

                dispatch(fetchPermisosSuccess(permisos));
            }).catch((error) => {
                dispatch(fetchPermisosError(error.response));
            });
    };
}

