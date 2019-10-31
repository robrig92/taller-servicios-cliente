import { 
    FETCH_USUARIOS_REQUEST, 
    FETCH_USUARIOS_SUCCESS, 
    FETCH_USUARIOS_ERROR,
    INSERT_USUARIOS_REQUEST,
    INSERT_USUARIOS_SUCCESS,
    INSERT_USUARIOS_ERROR,
    FETCH_USUARIOS_BY_ID_REQUEST,
    FETCH_USUARIOS_BY_ID_SUCCESS,
    FETCH_USUARIOS_BY_ID_ERROR,
    USUARIOS_SET_CURRENT,
    UPDATE_USUARIOS_REQUEST,
    UPDATE_USUARIOS_SUCCESS,
    UPDATE_USUARIOS_ERROR,
    DELETE_USUARIOS_REQUEST,
    DELETE_USUARIOS_SUCCESS,
    DELETE_USUARIOS_ERROR,
    USUARIOS_SET_META,
    USUARIOS_GET_PATH,
    USUARIOS_GET_PATH_ERROR
} from "../actions/actions";

export function usuario(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: [],
        meta: {
            imagePerfilSelected: "Seleccione un archivo...",
            currentFileSelected: undefined,
            imagePathServer: ''
        }
 }, action) {
    switch (action.type) {
        case FETCH_USUARIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_USUARIOS_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_USUARIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_USUARIOS_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_USUARIOS_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_USUARIOS_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_USUARIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_USUARIOS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_USUARIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_USUARIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_USUARIOS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_USUARIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_USUARIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_USUARIOS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_USUARIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case USUARIOS_SET_CURRENT:
            return {
                ...state, 
                current: action.payload
            };
            // No break
        case USUARIOS_SET_META:
            return Object.assign({}, state, {
                meta: action.meta
            });
            // No break.
        case USUARIOS_GET_PATH:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    imagePathServer: action.payload
                }
            };
            // No break
        case USUARIOS_GET_PATH_ERROR:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    imagePathServer: action.payload
                }
            };
            // No break
        default:
            return state;
            // No break
    }
}