import { 
    FETCH_SERVICIOS_REQUEST, 
    FETCH_SERVICIOS_SUCCESS, 
    INSERT_SERVICIOS_REQUEST, 
    INSERT_SERVICIOS_SUCCESS, 
    INSERT_SERVICIOS_ERROR, 
    SERVICIOS_SET_CURRENT, 
    FETCH_SERVICIOS_BY_ID_REQUEST, 
    FETCH_SERVICIOS_BY_ID_SUCCESS, 
    UPDATE_SERVICIOS_REQUEST, 
    UPDATE_SERVICIOS_ERROR, 
    FETCH_SERVICIOS_BY_ID_ERROR, 
    FETCH_SERVICIOS_ERROR, 
    DELETE_SERVICIOS_SUCCESS, 
    UPDATE_SERVICIOS_SUCCESS, 
    DELETE_SERVICIOS_REQUEST, 
    DELETE_SERVICIOS_ERROR 
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchServiciosRequest = () => {
    return {
        type: FETCH_SERVICIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchServiciosSuccess = (servicios) => {
    return {
        type: FETCH_SERVICIOS_SUCCESS,
        payload: servicios,
        requestStatus: 'success'
    };
}

export const fetchServiciosError = (errors) => {
    return {
        type: FETCH_SERVICIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchServiciosByIdRequest = () => {
    return {
        type: FETCH_SERVICIOS_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchServiciosByIdSuccess = (servicio) => {
    return {
        type: FETCH_SERVICIOS_BY_ID_SUCCESS,
        payload: servicio,
        requestStatus: 'success'
    };
}

export const fetchServiciosByIdError = (errors) => {
    return {
        type: FETCH_SERVICIOS_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertServiciosRequest = () => {
    return {
        type: INSERT_SERVICIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertServiciosSuccess = (servicio) => {
    return {
        type: INSERT_SERVICIOS_SUCCESS,
        payload: servicio,
        requestStatus: 'success'
    };
}

export const insertServiciosError = (errors) => {
    return {
        type: INSERT_SERVICIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateServiciosRequest = () => {
    return {
        type: UPDATE_SERVICIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateServiciosSuccess = (servicio) => {
    return {
        type: UPDATE_SERVICIOS_SUCCESS,
        payload: servicio,
        requestStatus: 'success'
    };
}

export const updateServiciosError = (errors) => {
    return {
        type: UPDATE_SERVICIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteServiciosRequest = () => {
    return {
        type: DELETE_SERVICIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteServiciosSuccess = (servicio) => {
    return {
        type: DELETE_SERVICIOS_SUCCESS,
        payload: servicio,
        requestStatus: 'success'
    };
}

export const deleteServiciosError = (errors) => {
    return {
        type: DELETE_SERVICIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const servicioSetCurrent = (current) => {
    return {
        type: SERVICIOS_SET_CURRENT,
        payload: current
    };
}

export function getServicios() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchServiciosRequest());

        return ApiService.get('/servicios', config)
            .then((response) => {
                let servicios = response.data.data.servicios;
                
                dispatch(fetchServiciosSuccess(servicios));
            }).catch((error) => {
                dispatch(fetchServiciosByIdError(error.response));
            });
    };
}

export function getServicio(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchServiciosByIdRequest());

        return ApiService.get(`/servicios/${id}`, config)
            .then((response) => {
                let servicio = response.data.data.servicio;
                
                dispatch(fetchServiciosByIdSuccess(servicio));
            }).catch((error) => {
                dispatch(fetchServiciosByIdError(error.response));
            });
    };
}

export function storeServicio(servicio) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertServiciosRequest());

        return ApiService.post('/servicios', servicio, config)
        .then((response) => {
            let servicios = response.data.data.servicios;
            
            dispatch(insertServiciosSuccess(servicios));
            Alerts.insertSuccess();
        }).catch((error) => {
            dispatch(insertServiciosError(error.response));
            Alerts.insertError();
        });
    };
}

export function updateServicio(servicio) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(updateServiciosRequest());

        return ApiService.patch(`/servicios/${servicio.id}`, servicio, config)
            .then((response) => {
                let servicio = response.data.data.servicio;

                dispatch(updateServiciosSuccess(servicio));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateServiciosError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteServicio(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteServiciosRequest());

        return ApiService.delete(`/servicios/${id}`, config)
            .then((response) => {
                let servicio = response.data.data.servicio;

                dispatch(deleteServiciosSuccess(servicio));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteServiciosError(error.response));
                Alerts.deleteError();
            });
    }
}