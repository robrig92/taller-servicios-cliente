import { 
    FETCH_MARCAS_REQUEST, 
    FETCH_MARCAS_SUCCESS, 
    INSERT_MARCAS_REQUEST, 
    INSERT_MARCAS_SUCCESS, 
    INSERT_MARCAS_ERROR, 
    MARCAS_SET_CURRENT, 
    FETCH_MARCAS_BY_ID_REQUEST, 
    FETCH_MARCAS_BY_ID_SUCCESS, 
    UPDATE_MARCAS_REQUEST, 
    UPDATE_MARCAS_ERROR, 
    FETCH_MARCAS_BY_ID_ERROR, 
    FETCH_MARCAS_ERROR, 
    DELETE_MARCAS_SUCCESS, 
    UPDATE_MARCAS_SUCCESS, 
    DELETE_MARCAS_REQUEST, 
    DELETE_MARCAS_ERROR 
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchMarcasRequest = () => {
    return {
        type: FETCH_MARCAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchMarcasSuccess = (marcas) => {
    return {
        type: FETCH_MARCAS_SUCCESS,
        payload: marcas,
        requestStatus: 'success'
    };
}

export const fetchMarcasError = (errors) => {
    return {
        type: FETCH_MARCAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchMarcasByIdRequest = () => {
    return {
        type: FETCH_MARCAS_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchMarcasByIdSuccess = (marca) => {
    return {
        type: FETCH_MARCAS_BY_ID_SUCCESS,
        payload: marca,
        requestStatus: 'success'
    };
}

export const fetchMarcasByIdError = (errors) => {
    return {
        type: FETCH_MARCAS_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertMarcasRequest = () => {
    return {
        type: INSERT_MARCAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertMarcasSuccess = (marca) => {
    return {
        type: INSERT_MARCAS_SUCCESS,
        payload: marca,
        requestStatus: 'success'
    };
}

export const insertMarcasError = (errors) => {
    return {
        type: INSERT_MARCAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateMarcasRequest = () => {
    return {
        type: UPDATE_MARCAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateMarcasSuccess = (marca) => {
    return {
        type: UPDATE_MARCAS_SUCCESS,
        payload: marca,
        requestStatus: 'success'
    };
}

export const updateMarcasError = (errors) => {
    return {
        type: UPDATE_MARCAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteMarcasRequest = () => {
    return {
        type: DELETE_MARCAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteMarcasSuccess = (marca) => {
    return {
        type: DELETE_MARCAS_SUCCESS,
        payload: marca,
        requestStatus: 'success'
    };
}

export const deleteMarcasError = (errors) => {
    return {
        type: DELETE_MARCAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const marcaSetCurrent = (current) => {
    return {
        type: MARCAS_SET_CURRENT,
        payload: current
    };
}

export function getMarcas() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchMarcasRequest());

        return ApiService.get('/marcas', config)
            .then((response) => {
                let marcas = response.data.data.marcas;
                
                dispatch(fetchMarcasSuccess(marcas));
            }).catch((error) => {
                dispatch(fetchMarcasByIdError(error.response));
            });
    };
}

export function getMarca(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchMarcasByIdRequest());

        return ApiService.get(`/marcas/${id}`, config)
            .then((response) => {
                let marca = response.data.data.marca;
                
                dispatch(fetchMarcasByIdSuccess(marca));
            }).catch((error) => {
                dispatch(fetchMarcasByIdError(error.response));
            });
    };
}

export function storeMarca(marca) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertMarcasRequest());

        return ApiService.post('/marcas', marca, config)
        .then((response) => {
            let marcas = response.data.data.marcas;
            
            dispatch(insertMarcasSuccess(marcas));
            Alerts.insertSuccess();
        }).catch((error) => {
            dispatch(insertMarcasError(error.response));
            Alerts.insertError();
        });
    };
}

export function updateMarca(marca) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };
        dispatch(updateMarcasRequest());

        return ApiService.patch(`/marcas/${marca.id}`, marca, config)
            .then((response) => {
                let marca = response.data.data.marca;

                dispatch(updateMarcasSuccess(marca));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateMarcasError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteMarca(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteMarcasRequest());
        
        return ApiService.delete(`/marcas/${id}`, config)
            .then((response) => {
                let marca = response.data.data.marca;

                dispatch(deleteMarcasSuccess(marca));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteMarcasError(error.response));
                Alerts.deleteError();
            });
    }
}