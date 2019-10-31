import { 
    FETCH_CLIENTES_REQUEST, 
    FETCH_CLIENTES_SUCCESS, 
    INSERT_CLIENTES_REQUEST, 
    INSERT_CLIENTES_SUCCESS, 
    INSERT_CLIENTES_ERROR, 
    CLIENTES_SET_CURRENT, 
    FETCH_CLIENTES_BY_ID_REQUEST, 
    FETCH_CLIENTES_BY_ID_SUCCESS, 
    UPDATE_CLIENTES_REQUEST, 
    UPDATE_CLIENTES_ERROR, 
    FETCH_CLIENTES_BY_ID_ERROR, 
    FETCH_CLIENTES_ERROR, 
    DELETE_CLIENTES_SUCCESS, 
    UPDATE_CLIENTES_SUCCESS, 
    DELETE_CLIENTES_REQUEST, 
    DELETE_CLIENTES_ERROR 
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchClientesRequest = () => {
    return {
        type: FETCH_CLIENTES_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchClientesSuccess = (clientes) => {
    return {
        type: FETCH_CLIENTES_SUCCESS,
        payload: clientes,
        requestStatus: 'success'
    };
}

export const fetchClientesError = (errors) => {
    return {
        type: FETCH_CLIENTES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchClientesByIdRequest = () => {
    return {
        type: FETCH_CLIENTES_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchClientesByIdSuccess = (cliente) => {
    return {
        type: FETCH_CLIENTES_BY_ID_SUCCESS,
        payload: cliente,
        requestStatus: 'success'
    };
}

export const fetchClientesByIdError = (errors) => {
    return {
        type: FETCH_CLIENTES_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertClientesRequest = () => {
    return {
        type: INSERT_CLIENTES_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertClientesSuccess = (cliente) => {
    return {
        type: INSERT_CLIENTES_SUCCESS,
        payload: cliente,
        requestStatus: 'success'
    };
}

export const insertClientesError = (errors) => {
    return {
        type: INSERT_CLIENTES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateClientesRequest = () => {
    return {
        type: UPDATE_CLIENTES_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateClientesSuccess = (cliente) => {
    return {
        type: UPDATE_CLIENTES_SUCCESS,
        payload: cliente,
        requestStatus: 'success'
    };
}

export const updateClientesError = (errors) => {
    return {
        type: UPDATE_CLIENTES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteClientesRequest = () => {
    return {
        type: DELETE_CLIENTES_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteClientesSuccess = (cliente) => {
    return {
        type: DELETE_CLIENTES_SUCCESS,
        payload: cliente,
        requestStatus: 'success'
    };
}

export const deleteClientesError = (errors) => {
    return {
        type: DELETE_CLIENTES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const clienteSetCurrent = (current) => {
    return {
        type: CLIENTES_SET_CURRENT,
        payload: current
    };
}

export function getClientes() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchClientesRequest());

        return ApiService.get('/clientes', config)
            .then((response) => {
                let clientes = response.data.data.clientes;
                
                dispatch(fetchClientesSuccess(clientes));
            }).catch((error) => {
                dispatch(fetchClientesByIdError(error.response));
            });
    };
}

export function getCliente(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };
        
        dispatch(fetchClientesByIdRequest());

        return ApiService.get(`/clientes/${id}`, config)
            .then((response) => {
                let cliente = response.data.data.cliente;
                
                dispatch(fetchClientesByIdSuccess(cliente));
            }).catch((error) => {
                dispatch(fetchClientesByIdError(error.response));
            });
    };
}

export function storeCliente(cliente) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertClientesRequest());

        return ApiService.post('/clientes', cliente, config)
        .then((response) => {
            let clientes = response.data.data.clientes;
            
            dispatch(insertClientesSuccess(clientes));
            Alerts.insertSuccess();
        }).catch((error) => {
            dispatch(insertClientesError(error.response));
            Alerts.insertError();
        });
    };
}

export function updateCliente(cliente) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(updateClientesRequest());

        return ApiService.patch(`/clientes/${cliente.hashId}`, cliente, config)
            .then((response) => {
                let cliente = response.data.data.cliente;

                dispatch(updateClientesSuccess(cliente));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateClientesError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteCliente(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteClientesRequest());

        return ApiService.delete(`/clientes/${id}`, config)
            .then((response) => {
                let cliente = response.data.data.cliente;

                dispatch(deleteClientesSuccess(cliente));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteClientesError(error.response));
                Alerts.deleteError();
            });
    }
}