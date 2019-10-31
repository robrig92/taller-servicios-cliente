import { 
    FETCH_USUARIOS_REQUEST, 
    FETCH_USUARIOS_SUCCESS, 
    INSERT_USUARIOS_REQUEST, 
    INSERT_USUARIOS_SUCCESS, 
    INSERT_USUARIOS_ERROR, 
    USUARIOS_SET_CURRENT, 
    FETCH_USUARIOS_BY_ID_REQUEST, 
    FETCH_USUARIOS_BY_ID_SUCCESS, 
    UPDATE_USUARIOS_REQUEST, 
    UPDATE_USUARIOS_ERROR, 
    FETCH_USUARIOS_BY_ID_ERROR, 
    FETCH_USUARIOS_ERROR, 
    DELETE_USUARIOS_SUCCESS, 
    UPDATE_USUARIOS_SUCCESS, 
    DELETE_USUARIOS_REQUEST, 
    DELETE_USUARIOS_ERROR,
    USUARIOS_SET_META,
    USUARIOS_GET_PATH
} from "./actions";
import ApiService from '../helpers/ApiService';
import Alerts from "../components/Core/Alerts/Alerts";

export const fetchUsuariosRequest = () => {
    return {
        type: FETCH_USUARIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchUsuariosSuccess = (usuarios) => {
    return {
        type: FETCH_USUARIOS_SUCCESS,
        payload: usuarios,
        requestStatus: 'success'
    };
}

export const fetchUsuariosError = (errors) => {
    return {
        type: FETCH_USUARIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const fetchUsuariosByIdRequest = () => {
    return {
        type: FETCH_USUARIOS_BY_ID_REQUEST,
        requestStatus: 'loading'
    };
}

export const fetchUsuariosByIdSuccess = (usuario) => {
    return {
        type: FETCH_USUARIOS_BY_ID_SUCCESS,
        payload: usuario,
        requestStatus: 'success'
    };
}

export const fetchUsuariosByIdError = (errors) => {
    return {
        type: FETCH_USUARIOS_BY_ID_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const insertUsuariosRequest = () => {
    return {
        type: INSERT_USUARIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const insertUsuariosSuccess = (usuario) => {
    return {
        type: INSERT_USUARIOS_SUCCESS,
        payload: usuario,
        requestStatus: 'success'
    };
}

export const insertUsuariosError = (errors) => {
    return {
        type: INSERT_USUARIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const updateUsuariosRequest = () => {
    return {
        type: UPDATE_USUARIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const updateUsuariosSuccess = (usuario) => {
    return {
        type: UPDATE_USUARIOS_SUCCESS,
        payload: usuario,
        requestStatus: 'success'
    };
}

export const updateUsuariosError = (errors) => {
    return {
        type: UPDATE_USUARIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const deleteUsuariosRequest = () => {
    return {
        type: DELETE_USUARIOS_REQUEST,
        requestStatus: 'loading'
    };
}

export const deleteUsuariosSuccess = (usuario) => {
    return {
        type: DELETE_USUARIOS_SUCCESS,
        payload: usuario,
        requestStatus: 'success'
    };
}

export const deleteUsuariosError = (errors) => {
    return {
        type: DELETE_USUARIOS_ERROR,
        payload: errors,
        requestStatus: 'error'
    };
}

export const usuarioSetCurrent = (current) => {
    return {
        type: USUARIOS_SET_CURRENT,
        payload: current
    };
}

export const usuarioSetMeta = (meta) => {
    return {
        type: USUARIOS_SET_META,
        meta: meta
    };
}

export const usuariosGetPath = (path) => {
    return {
        type: USUARIOS_GET_PATH,
        payload: path
    }
}

export const usuariosGetPathError = (path) => {
    return {
        type: USUARIOS_GET_PATH,
        payload: path
    }
}

export function getUsuarios() {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchUsuariosRequest());

        return ApiService.get('/usuarios', config)
            .then((response) => {
                let usuarios = response.data.data.usuarios;
                
                dispatch(fetchUsuariosSuccess(usuarios));
            }).catch((error) => {
                console.log(error);
                
                const status = error.response.status;

                if (status === 404) {
                    dispatch(fetchUsuariosSuccess([]));
                    return;
                }

                dispatch(fetchUsuariosByIdError(error.response));
            });
    };
}

export function getUsuario(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(fetchUsuariosByIdRequest());

        return ApiService.get(`/usuarios/${id}`, config)
            .then((response) => {
                let usuario = response.data.data.usuario;
                
                dispatch(fetchUsuariosByIdSuccess(usuario));
            }).catch((error) => {
                dispatch(fetchUsuariosByIdError(error.response));
            });
    };
}

export function storeUsuario(usuario) {
    let data = new FormData();

    data.set("nombre", usuario.nombre);
    data.set("email", usuario.email);
    data.set("password", usuario.password);
    data.set("rol_id", usuario.rol_id);
    data.set("telefono", usuario.telefono);
    data.set("usuarioCreador", usuario.usuarioCreador);
    data.append("imagePerfil", usuario.imagePerfil);

    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(insertUsuariosRequest());

        return ApiService.post('/usuarios', data, config)
            .then((response) => {
                let usuarios = response.data.data.usuarios;
                
                dispatch(insertUsuariosSuccess(usuarios));
                Alerts.insertSuccess();
            }).catch((error) => {
                dispatch(insertUsuariosError(error.response));
                Alerts.insertError();
            });
    };
}

export function updateUsuario(usuario) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(updateUsuariosRequest());

        let data = new FormData();

        data.set('_method', 'PATCH');
        data.set("nombre", usuario.nombre);
        data.set("email", usuario.email);
        data.set("password", usuario.password);
        data.set("rol_id", usuario.rol_id);
        data.set("telefono", usuario.telefono);
        data.append("imagePerfil", usuario.imagePerfil);

        return ApiService.post(`/usuarios/${usuario.hashId}`, data, config)
            .then((response) => {
                let usuario = response.data.data.usuario;

                dispatch(updateUsuariosSuccess(usuario));
                Alerts.updateSuccess();
            }).catch((error) => {
                dispatch(updateUsuariosError(error.response));
                Alerts.updateError();
            });
    }
}

export function deleteUsuario(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        dispatch(deleteUsuariosRequest());

        return ApiService.delete(`/usuarios/${id}`, config)
            .then((response) => {
                let usuario = response.data.data.usuario;

                dispatch(deleteUsuariosSuccess(usuario));
                Alerts.deleteSuccess();
            }).catch((error) => {
                dispatch(deleteUsuariosError(error.response));
                Alerts.deleteError();
            });
    }
}

export function getImagePerfilPath(id) {
    return (dispatch, getState) => {
        let config = {
            headers: {
                'Authorization': "bearer " + getState().auth.token
            }
        };

        return ApiService.get(`/usuarios/file/${id}`, config)
            .then((response) => {
                let path = response.data.data.url;

                dispatch(usuariosGetPath(path));
            }).catch((error) => {
                dispatch(usuariosGetPathError(''));
            });
    }
} 