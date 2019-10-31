import { 
    FETCH_ROLES_REQUEST, 
    FETCH_ROLES_SUCCESS, 
    INSERT_ROLES_REQUEST, 
    INSERT_ROLES_SUCCESS, 
    INSERT_ROLES_ERROR, 
    ROLES_SET_CURRENT, 
    FETCH_ROLES_BY_ID_REQUEST, 
    FETCH_ROLES_BY_ID_SUCCESS, 
    UPDATE_ROLES_REQUEST, 
    UPDATE_ROLES_ERROR, 
    FETCH_ROLES_BY_ID_ERROR, 
    FETCH_ROLES_ERROR, 
    DELETE_ROLES_SUCCESS, 
    UPDATE_ROLES_SUCCESS, 
    DELETE_ROLES_REQUEST, 
    DELETE_ROLES_ERROR,
    ROLES_SET_META,
    ROLES_ADD_PERMISO_REQUEST,
    ROLES_ADD_PERMISO_SUCCESS,
    ROLES_ADD_PERMISO_ERROR,
    ROLES_DELETE_PERMISO_REQUEST,
    ROLES_DELETE_PERMISO_SUCCESS,
    ROLES_DELETE_PERMISO_ERROR
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchRolesRequest = () => {
    return {
        type: FETCH_ROLES_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchRolesSuccess = (roles) => {
    return {
        type: FETCH_ROLES_SUCCESS,
        payload: roles,
        requestStatus: 'success'
    };
}

export const fetchRolesError = (errors) => {
    return {
        type: FETCH_ROLES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchRolesByIdRequest = () => {
    return {
        type: FETCH_ROLES_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchRolesByIdSuccess = (rol) => {
    return {
        type: FETCH_ROLES_BY_ID_SUCCESS,
        payload: rol,
        requestStatus: 'success'
    };
}

export const fetchRolesByIdError = (errors) => {
    return {
        type: FETCH_ROLES_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertRolesRequest = () => {
    return {
        type: INSERT_ROLES_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertRolesSuccess = (rol) => {
    return {
        type: INSERT_ROLES_SUCCESS,
        payload: rol,
        requestStatus: 'success'
    };
}

export const insertRolesError = (errors) => {
    return {
        type: INSERT_ROLES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateRolesRequest = () => {
    return {
        type: UPDATE_ROLES_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateRolesSuccess = (rol) => {
    return {
        type: UPDATE_ROLES_SUCCESS,
        payload: rol,
        requestStatus: 'success'
    };
}

export const updateRolesError = (errors) => {
    return {
        type: UPDATE_ROLES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteRolesRequest = () => {
    return {
        type: DELETE_ROLES_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteRolesSuccess = (rol) => {
    return {
        type: DELETE_ROLES_SUCCESS,
        payload: rol,
        requestStatus: 'success'
    };
}

export const deleteRolesError = (errors) => {
    return {
        type: DELETE_ROLES_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const rolSetCurrent = (current) => {
    return {
        type: ROLES_SET_CURRENT,
        payload: current
    };
}

export const rolSetMeta = (meta) => {
    return {
        type: ROLES_SET_META,
        meta: meta
    };
}

export const rolAddPermisoFetch = () => {
    return {
        type: ROLES_ADD_PERMISO_REQUEST,
        requestStatus: 'loading'
    };
}

export const rolAddPermisoSuccess = (rol) => {
    return {
        type: ROLES_ADD_PERMISO_SUCCESS,
        payload: rol, 
        requestStatus: 'success'
    };
}

export const rolAddPermisoError = (error) => {
    return {
        type: ROLES_ADD_PERMISO_ERROR,
        payload: error,
        requestStatus: 'error'
    };
}

export const rolDeletePermisoFetch = () => {
    return {
        type: ROLES_DELETE_PERMISO_REQUEST,
        requestStatus: 'loading'
    };
}

export const rolDeletePermisoSuccess = (rol) => {
    return {
        type: ROLES_DELETE_PERMISO_SUCCESS,
        payload: rol,
        requestStatus: 'success'
    };
}

export const rolDeletePermisoError = (error) => {
    return {
        type: ROLES_DELETE_PERMISO_ERROR,
        payload: error,
        requestStatus: 'error'
    };
}

export function getRoles() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchRolesRequest());

        return ApiService.get('/roles', config)
            .then((response) => {
                let roles = response.data.data.roles;
                
                dispatch(fetchRolesSuccess(roles));
            }).catch((error) => {
                dispatch(fetchRolesByIdError(error.response));
            });
    };
}

export function getRol(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchRolesByIdRequest());

        return ApiService.get(`/roles/${id}`, config)
            .then((response) => {
                let rol = response.data.data.rol;
                
                dispatch(fetchRolesByIdSuccess(rol));
            }).catch((error) => {
                dispatch(fetchRolesByIdError(error.response));
            });
    };
}

export function storeRol(rol) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertRolesRequest());

        return ApiService.post('/roles', rol, config)
        .then((response) => {
            let roles = response.data.data.roles;
            
            dispatch(insertRolesSuccess(roles));
            Alerts.insertSuccess();
        }).catch((error) => {
            dispatch(insertRolesError(error.response));
            Alerts.insertError();
        });
    };
}

export function updateRol(rol) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(updateRolesRequest());

        return ApiService.patch(`/roles/${rol.id}`, rol, config)
            .then((response) => {
                let rol = response.data.data.rol;

                dispatch(updateRolesSuccess(rol));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateRolesError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteRol(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteRolesRequest());

        return ApiService.delete(`/roles/${id}`, config)
            .then((response) => {
                let rol = response.data.data.rol;

                dispatch(deleteRolesSuccess(rol));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteRolesError(error.response));
                Alerts.deleteError();
            });
    }
}

export function rolAddPermiso(id, permisoId) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };
        let data = {
            permisoId: permisoId
        };

        dispatch(rolAddPermisoFetch());

        return ApiService.post(`/roles/${id}/permisos`, data, config)
            .then((response) => {
                let rol = response.data.data.rol;

                dispatch(rolAddPermisoSuccess(rol));
                Alerts.insertSuccess();
            }).catch((error) => {
                dispatch(rolAddPermisoError(error.response));
                Alerts.insertError();
            });
    }
}

export function rolDeletePermiso(id, permisoId) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        let data = {
            _method: 'DELETE',
            permisoId: permisoId
        };

        dispatch(rolDeletePermisoFetch());

        return ApiService.post(`/roles/${id}/permisos`, data, config)
            .then((response) => {
                let rol = response.data.data.rol;

                dispatch(rolDeletePermisoSuccess(rol));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(rolDeletePermisoError(error.response));
                Alerts.deleteError();
            });
    }
}