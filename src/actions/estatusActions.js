import {
    FETCH_ESTATUS_REQUEST,
    FETCH_ESTATUS_SUCCESS,
    ESTATUS_SET_CURRENT,
    FETCH_ESTATUS_BY_ID_REQUEST,
    FETCH_ESTATUS_BY_ID_SUCCESS,
    FETCH_ESTATUS_BY_ID_ERROR,
    FETCH_ESTATUS_ERROR
} from "./actions";
import ApiService from '../helpers/ApiService';

export const fetchEstatusRequest = () => {
    return {
        type: FETCH_ESTATUS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchEstatusSuccess = (estatus) => {
    return {
        type: FETCH_ESTATUS_SUCCESS,
        payload: estatus,
        requestStatus: 'success'
    };
}

export const fetchEstatusError = (errors) => {
    return {
        type: FETCH_ESTATUS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchEstatusByIdRequest = () => {
    return {
        type: FETCH_ESTATUS_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchEstatusByIdSuccess = (estatus) => {
    return {
        type: FETCH_ESTATUS_BY_ID_SUCCESS,
        payload: estatus,
        requestStatus: 'success'
    };
}

export const fetchEstatusByIdError = (errors) => {
    return {
        type: FETCH_ESTATUS_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const estatusSetCurrent = (current) => {
    return {
        type: ESTATUS_SET_CURRENT,
        payload: current
    };
}

export function getEstatusAll() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchEstatusRequest());

        return ApiService.get('/estatus', config)
            .then((response) => {
                let estatus = response.data.data.estatus;

                dispatch(fetchEstatusSuccess(estatus));
            }).catch((error) => {
                dispatch(fetchEstatusError(error.response));
            });
    };
}

export function getEstatus(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchEstatusByIdRequest());

        return ApiService.get(`/estatus/${id}`, config)
            .then((response) => {
                let estatus = response.data.data.estatus;

                dispatch(fetchEstatusByIdSuccess(estatus));
            }).catch((error) => {
                dispatch(fetchEstatusByIdError(error.response));
            });
    };
}
