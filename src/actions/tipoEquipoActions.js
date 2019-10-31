import { 
    FETCH_TIPO_EQUIPO_REQUEST, 
    FETCH_TIPO_EQUIPO_SUCCESS, 
    INSERT_TIPO_EQUIPO_REQUEST, 
    INSERT_TIPO_EQUIPO_SUCCESS, 
    INSERT_TIPO_EQUIPO_ERROR, 
    TIPO_EQUIPO_SET_CURRENT, 
    FETCH_TIPO_EQUIPO_BY_ID_REQUEST, 
    FETCH_TIPO_EQUIPO_BY_ID_SUCCESS, 
    UPDATE_TIPO_EQUIPO_REQUEST, 
    UPDATE_TIPO_EQUIPO_ERROR, 
    FETCH_TIPO_EQUIPO_BY_ID_ERROR, 
    FETCH_TIPO_EQUIPO_ERROR, 
    DELETE_TIPO_EQUIPO_SUCCESS, 
    UPDATE_TIPO_EQUIPO_SUCCESS, 
    DELETE_TIPO_EQUIPO_REQUEST, 
    DELETE_TIPO_EQUIPO_ERROR 
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchTipoEquipoRequest = () => {
    return {
        type: FETCH_TIPO_EQUIPO_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchTipoEquipoSuccess = (tipoEquipos) => {
    return {
        type: FETCH_TIPO_EQUIPO_SUCCESS,
        payload: tipoEquipos,
        requestStatus: 'success'
    };
}

export const fetchTipoEquipoError = (errors) => {
    return {
        type: FETCH_TIPO_EQUIPO_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchTipoEquipoByIdRequest = () => {
    return {
        type: FETCH_TIPO_EQUIPO_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchTipoEquipoByIdSuccess = (tipoEquipo) => {
    return {
        type: FETCH_TIPO_EQUIPO_BY_ID_SUCCESS,
        payload: tipoEquipo,
        requestStatus: 'success'
    };
}

export const fetchTipoEquipoByIdError = (errors) => {
    return {
        type: FETCH_TIPO_EQUIPO_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertTipoEquipoRequest = () => {
    return {
        type: INSERT_TIPO_EQUIPO_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertTipoEquipoSuccess = (tipoEquipo) => {
    return {
        type: INSERT_TIPO_EQUIPO_SUCCESS,
        payload: tipoEquipo,
        requestStatus: 'success'
    };
}

export const insertTipoEquipoError = (errors) => {
    return {
        type: INSERT_TIPO_EQUIPO_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateTipoEquipoRequest = () => {
    return {
        type: UPDATE_TIPO_EQUIPO_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateTipoEquipoSuccess = (tipoEquipo) => {
    return {
        type: UPDATE_TIPO_EQUIPO_SUCCESS,
        payload: tipoEquipo,
        requestStatus: 'success'
    };
}

export const updateTipoEquipoError = (errors) => {
    return {
        type: UPDATE_TIPO_EQUIPO_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteTipoEquipoRequest = () => {
    return {
        type: DELETE_TIPO_EQUIPO_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteTipoEquipoSuccess = (tipoEquipo) => {
    return {
        type: DELETE_TIPO_EQUIPO_SUCCESS,
        payload: tipoEquipo,
        requestStatus: 'success'
    };
}

export const deleteTipoEquipoError = (errors) => {
    return {
        type: DELETE_TIPO_EQUIPO_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const tipoEquipoSetCurrent = (current) => {
    return {
        type: TIPO_EQUIPO_SET_CURRENT,
        payload: current
    };
}

export function getTipoEquipos() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchTipoEquipoRequest());

        return ApiService.get('/tipoequipos', config)
            .then((response) => {
                let tipoEquipos = response.data.data.tipoEquipos;
                
                dispatch(fetchTipoEquipoSuccess(tipoEquipos));
            }).catch((error) => {
                dispatch(fetchTipoEquipoByIdError(error.response));
            });
    };
}

export function getTipoEquipo(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchTipoEquipoByIdRequest());

        return ApiService.get(`/tipoequipos/${id}`, config)
            .then((response) => {
                let tipoEquipo = response.data.data.tipoEquipo;
                
                dispatch(fetchTipoEquipoByIdSuccess(tipoEquipo));
            }).catch((error) => {
                dispatch(fetchTipoEquipoByIdError(error.response));
            });
    };
}

export function storeTipoEquipo(tipoEquipo) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertTipoEquipoRequest());

        return ApiService.post('/tipoequipos', tipoEquipo, config)
        .then((response) => {
            let tipoEquipos = response.data.data.tipoEquipos;
            
            dispatch(insertTipoEquipoSuccess(tipoEquipos));
            Alerts.insertSuccess();
        }).catch((error) => {
            dispatch(insertTipoEquipoError(error.response));
            Alerts.insertError();
        });
    };
}

export function updateTipoEquipo(tipoEquipo) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };
        dispatch(updateTipoEquipoRequest());

        return ApiService.patch(`/tipoequipos/${tipoEquipo.hashId}`, tipoEquipo, config)
            .then((response) => {
                let tipoEquipo = response.data.data.tipoEquipo;

                dispatch(updateTipoEquipoSuccess(tipoEquipo));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateTipoEquipoError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteTipoEquipo(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteTipoEquipoRequest());

        return ApiService.delete(`/tipoequipos/${id}`, config)
            .then((response) => {
                let tipoEquipo = response.data.data.tipoEquipo;

                dispatch(deleteTipoEquipoSuccess(tipoEquipo));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteTipoEquipoError(error.response));
                Alerts.deleteError();
            });
    }
}