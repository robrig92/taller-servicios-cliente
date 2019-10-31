import {
    FETCH_FOLIOS_REQUEST,
    FETCH_FOLIOS_SUCCESS,
    INSERT_FOLIOS_REQUEST,
    INSERT_FOLIOS_SUCCESS,
    INSERT_FOLIOS_ERROR,
    FOLIOS_SET_CURRENT,
    FETCH_FOLIOS_BY_ID_REQUEST,
    FETCH_FOLIOS_BY_ID_SUCCESS,
    UPDATE_FOLIOS_REQUEST,
    UPDATE_FOLIOS_ERROR,
    FETCH_FOLIOS_BY_ID_ERROR,
    FETCH_FOLIOS_ERROR,
    DELETE_FOLIOS_SUCCESS,
    UPDATE_FOLIOS_SUCCESS,
    DELETE_FOLIOS_REQUEST,
    DELETE_FOLIOS_ERROR
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchFoliosRequest = () => {
    return {
        type: FETCH_FOLIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchFoliosSuccess = (folios) => {
    return {
        type: FETCH_FOLIOS_SUCCESS,
        payload: folios,
        requestStatus: 'success'
    };
}

export const fetchFoliosError = (errors) => {
    return {
        type: FETCH_FOLIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchFoliosByIdRequest = () => {
    return {
        type: FETCH_FOLIOS_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchFoliosByIdSuccess = (folio) => {
    return {
        type: FETCH_FOLIOS_BY_ID_SUCCESS,
        payload: folio,
        requestStatus: 'success'
    };
}

export const fetchFoliosByIdError = (errors) => {
    return {
        type: FETCH_FOLIOS_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertFoliosRequest = () => {
    return {
        type: INSERT_FOLIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertFoliosSuccess = (folio) => {
    return {
        type: INSERT_FOLIOS_SUCCESS,
        payload: folio,
        requestStatus: 'success'
    };
}

export const insertFoliosError = (errors) => {
    return {
        type: INSERT_FOLIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateFoliosRequest = () => {
    return {
        type: UPDATE_FOLIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateFoliosSuccess = (folio) => {
    return {
        type: UPDATE_FOLIOS_SUCCESS,
        payload: folio,
        requestStatus: 'success'
    };
}

export const updateFoliosError = (errors) => {
    return {
        type: UPDATE_FOLIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteFoliosRequest = () => {
    return {
        type: DELETE_FOLIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteFoliosSuccess = (folio) => {
    return {
        type: DELETE_FOLIOS_SUCCESS,
        payload: folio,
        requestStatus: 'success'
    };
}

export const deleteFoliosError = (errors) => {
    return {
        type: DELETE_FOLIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const folioSetCurrent = (current) => {
    return {
        type: FOLIOS_SET_CURRENT,
        payload: current
    };
}

export function getFolios() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };
        
        dispatch(fetchFoliosRequest());

        return ApiService.get('/folios', config)
            .then((response) => {
                let folios = response.data.data.folios;

                dispatch(fetchFoliosSuccess(folios));
            }).catch((error) => {
                dispatch(fetchFoliosByIdError(error.response));
            });
    };
}

export function getFolio(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchFoliosByIdRequest());

        return ApiService.get(`/folios/${id}`, config)
            .then((response) => {
                let folio = response.data.data.folio;

                dispatch(fetchFoliosByIdSuccess(folio));
            }).catch((error) => {
                dispatch(fetchFoliosByIdError(error.response));
            });
    };
}

export function storeFolio(folio) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertFoliosRequest());

        return ApiService.post('/folios', folio, config)
            .then((response) => {
                let folios = response.data.data.folios;

                dispatch(insertFoliosSuccess(folios));
                Alerts.insertSuccess();
            }).catch((error) => {
                dispatch(insertFoliosError(error.response));
                Alerts.insertError();
            });
    };
}

export function updateFolio(folio) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(updateFoliosRequest());

        return ApiService.patch(`/folios/${folio.id}`, folio, config)
            .then((response) => {
                let folio = response.data.data.folio;

                dispatch(updateFoliosSuccess(folio));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateFoliosError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteFolio(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteFoliosRequest());

        return ApiService.delete(`/folios/${id}`, config)
            .then((response) => {
                let folio = response.data.data.folio;

                dispatch(deleteFoliosSuccess(folio));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteFoliosError(error.response));
                Alerts.deleteError();
            });
    }
}