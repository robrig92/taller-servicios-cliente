import {
    FETCH_COUNTS_REQUEST,
    FETCH_COUNTS_SUCCESS,
    FETCH_COUNTS_ERROR,
    FETCH_FOLIOS_BY_ESTATUS_REQUEST,
    FETCH_FOLIOS_BY_ESTATUS_SUCCESS,
    FETCH_FOLIOS_BY_ESTATUS_ERROR,
    FETCH_FOLIOS_BY_USUARIO_CREADOR_REQUEST,
    FETCH_FOLIOS_BY_USUARIO_CREADOR_SUCCESS,
    FETCH_FOLIOS_BY_USUARIO_CREADOR_ERROR,
    FETCH_FOLIOS_BY_USUARIO_ASIGNADO_REQUEST,
    FETCH_FOLIOS_BY_USUARIO_ASIGNADO_SUCCESS,
    FETCH_FOLIOS_BY_USUARIO_ASIGNADO_ERROR
} from "./actions";
import ApiService from "../helpers/ApiService";

export function fetchCountsRequest() {
    return {
        type: FETCH_COUNTS_REQUEST,
        requestStatus: 'loading'
    };
}

export function fetchCountsSuccess(counts) {
    return {
        type: FETCH_COUNTS_SUCCESS,
        requestStatus: 'success',
        payload: counts
    };
}

export function fetchCountsError(error) {
    return {
        type: FETCH_COUNTS_ERROR,
        requestStatus: 'error',
        payload: error
    };
}

export function fetchFoliosByEstatusRequest() {
    return {
        type: FETCH_FOLIOS_BY_ESTATUS_REQUEST,
        requestStatus: 'loading'
    };
}

export function fetchFoliosByEstatusSuccess(folios) {
    return {
        type: FETCH_FOLIOS_BY_ESTATUS_SUCCESS,
        requestStatus: 'success',
        payload: folios
    };
}

export function fetchFoliosByEstatusError(error) {
    return {
        type: FETCH_FOLIOS_BY_ESTATUS_ERROR,
        requestStatus: 'error',
        payload: error
    };
}

export function fetchFoliosByUsuarioCreadorRequest() {
    return {
        type: FETCH_FOLIOS_BY_USUARIO_CREADOR_REQUEST,
        requestStatus: 'loading'
    };
}

export function fetchFoliosByUsuarioCreadorSuccess(folios) {
    return {
        type: FETCH_FOLIOS_BY_USUARIO_CREADOR_SUCCESS,
        requestStatus: 'success',
        payload: folios
    };
}

export function fetchFoliosByUsuarioCreadorError(error) {
    return {
        type: FETCH_FOLIOS_BY_USUARIO_CREADOR_ERROR,
        requestStatus: 'error',
        payload: error
    };
}

export function fetchFoliosByUsuarioAsignadoRequest() {
    return {
        type: FETCH_FOLIOS_BY_USUARIO_ASIGNADO_REQUEST,
        requestStatus: 'loading'
    };
}

export function fetchFoliosByUsuarioAsignadoSuccess(folios) {
    return {
        type: FETCH_FOLIOS_BY_USUARIO_ASIGNADO_SUCCESS,
        requestStatus: 'success',
        payload: folios
    };
}

export function fetchFoliosByUsuarioAsignadoError(error) {
    return {
        type: FETCH_FOLIOS_BY_USUARIO_ASIGNADO_ERROR,
        requestStatus: 'error',
        payload: error
    };
}

export function getDashboardCounts() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchCountsRequest());

        return ApiService.get('/dashboard/counts', config)
            .then((response) => {
                let counts = response.data.data;

                dispatch(fetchCountsSuccess(counts));
            }).catch((error) => {
                dispatch(fetchCountsError(error.response));                
            });
    }
}

export function getDashboardFoliosByEstatus() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchFoliosByEstatusRequest);

        return ApiService.get('/dashboard/folios/status', config)
            .then((response) => {
                let folios = response.data.data.folios;

                dispatch(fetchFoliosByEstatusSuccess(folios));
            }).catch((error) => {
                dispatch(fetchFoliosByEstatusError(error.response));
            });
    };
}

export function getDashboardFoliosByUsuarioCreador() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchFoliosByUsuarioCreadorRequest);

        return ApiService.get('/dashboard/folios/created', config)
            .then((response) => {
                let folios = response.data.data.folios;

                dispatch(fetchFoliosByUsuarioCreadorSuccess(folios));
            }).catch((error) => {
                dispatch(fetchFoliosByUsuarioCreadorError(error.response));
            });
    };
}

export function getDashboardFoliosByUsuarioAsignado() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchFoliosByUsuarioAsignadoRequest);

        return ApiService.get('/dashboard/folios/asigned', config)
            .then((response) => {
                let folios = response.data.data.folios;

                dispatch(fetchFoliosByUsuarioAsignadoSuccess(folios));
            }).catch((error) => {
                dispatch(fetchFoliosByUsuarioAsignadoError(error.response));
            });
    };
}