import { 
    FETCH_EMPRESAS_REQUEST, 
    FETCH_EMPRESAS_SUCCESS, 
    INSERT_EMPRESAS_REQUEST, 
    INSERT_EMPRESAS_SUCCESS, 
    INSERT_EMPRESAS_ERROR, 
    EMPRESAS_SET_CURRENT, 
    FETCH_EMPRESAS_BY_ID_REQUEST, 
    FETCH_EMPRESAS_BY_ID_SUCCESS, 
    UPDATE_EMPRESAS_REQUEST, 
    UPDATE_EMPRESAS_ERROR, 
    FETCH_EMPRESAS_BY_ID_ERROR, 
    FETCH_EMPRESAS_ERROR, 
    DELETE_EMPRESAS_SUCCESS, 
    UPDATE_EMPRESAS_SUCCESS, 
    DELETE_EMPRESAS_REQUEST, 
    DELETE_EMPRESAS_ERROR 
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchEmpresasRequest = () => {
    return {
        type: FETCH_EMPRESAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchEmpresasSuccess = (empresas) => {
    return {
        type: FETCH_EMPRESAS_SUCCESS,
        payload: empresas,
        requestStatus: 'success'
    };
}

export const fetchEmpresasError = (errors) => {
    return {
        type: FETCH_EMPRESAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchEmpresasByIdRequest = () => {
    return {
        type: FETCH_EMPRESAS_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchEmpresasByIdSuccess = (empresa) => {
    return {
        type: FETCH_EMPRESAS_BY_ID_SUCCESS,
        payload: empresa,
        requestStatus: 'success'
    };
}

export const fetchEmpresasByIdError = (errors) => {
    return {
        type: FETCH_EMPRESAS_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertEmpresasRequest = () => {
    return {
        type: INSERT_EMPRESAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertEmpresasSuccess = (empresa) => {
    return {
        type: INSERT_EMPRESAS_SUCCESS,
        payload: empresa,
        requestStatus: 'success'
    };
}

export const insertEmpresasError = (errors) => {
    return {
        type: INSERT_EMPRESAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateEmpresasRequest = () => {
    return {
        type: UPDATE_EMPRESAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateEmpresasSuccess = (empresa) => {
    return {
        type: UPDATE_EMPRESAS_SUCCESS,
        payload: empresa,
        requestStatus: 'success'
    };
}

export const updateEmpresasError = (errors) => {
    return {
        type: UPDATE_EMPRESAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteEmpresasRequest = () => {
    return {
        type: DELETE_EMPRESAS_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteEmpresasSuccess = (empresa) => {
    return {
        type: DELETE_EMPRESAS_SUCCESS,
        payload: empresa,
        requestStatus: 'success'
    };
}

export const deleteEmpresasError = (errors) => {
    return {
        type: DELETE_EMPRESAS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const empresaSetCurrent = (current) => {
    return {
        type: EMPRESAS_SET_CURRENT,
        payload: current
    };
}

export function getEmpresas() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchEmpresasRequest());

        return ApiService.get('/empresas', config)
            .then((response) => {
                let empresas = response.data.data.empresas;
                
                dispatch(fetchEmpresasSuccess(empresas));
            }).catch((error) => {
                dispatch(fetchEmpresasByIdError(error.response));
            });
    };
}

export function getEmpresa(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchEmpresasByIdRequest());

        return ApiService.get(`/empresas/${id}`, config)
            .then((response) => {
                let empresa = response.data.data.empresa;
                
                dispatch(fetchEmpresasByIdSuccess(empresa));
            }).catch((error) => {
                dispatch(fetchEmpresasByIdError(error.response));
            });
    };
}

export function storeEmpresa(empresa) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertEmpresasRequest());

        return ApiService.post('/empresas', empresa, config)
        .then((response) => {
            let empresas = response.data.data.empresas;
            
            dispatch(insertEmpresasSuccess(empresas));
            Alerts.insertSuccess();
        }).catch((error) => {
            dispatch(insertEmpresasError(error.response));
            Alerts.insertError();
        });
    };
}

export function updateEmpresa(empresa) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(updateEmpresasRequest());

        return ApiService.patch(`/empresas/${empresa.id}`, empresa, config)
            .then((response) => {
                let empresa = response.data.data.empresa;

                dispatch(updateEmpresasSuccess(empresa));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateEmpresasError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteEmpresa(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteEmpresasRequest());

        return ApiService.delete(`/empresas/${id}`, config)
            .then((response) => {
                let empresa = response.data.data.empresa;

                dispatch(deleteEmpresasSuccess(empresa));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteEmpresasError(error.response));
                Alerts.deleteError();
            });
    }
}