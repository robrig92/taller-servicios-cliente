import { 
    FETCH_ROLES_REQUEST, 
    FETCH_ROLES_SUCCESS, 
    FETCH_ROLES_ERROR,
    INSERT_ROLES_REQUEST,
    INSERT_ROLES_SUCCESS,
    INSERT_ROLES_ERROR,
    FETCH_ROLES_BY_ID_REQUEST,
    FETCH_ROLES_BY_ID_SUCCESS,
    FETCH_ROLES_BY_ID_ERROR,
    ROLES_SET_CURRENT,
    UPDATE_ROLES_REQUEST,
    UPDATE_ROLES_SUCCESS,
    UPDATE_ROLES_ERROR,
    DELETE_ROLES_REQUEST,
    DELETE_ROLES_SUCCESS,
    DELETE_ROLES_ERROR,
    ROLES_SET_META,
    ROLES_ADD_PERMISO_REQUEST,
    ROLES_ADD_PERMISO_SUCCESS,
    ROLES_ADD_PERMISO_ERROR,
    ROLES_DELETE_PERMISO_REQUEST,
    ROLES_DELETE_PERMISO_SUCCESS,
    ROLES_DELETE_PERMISO_ERROR
} from "../actions/actions";

export function rol(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: [],
        meta: {
            addPermission: false
        }
 }, action) {
    switch (action.type) {
        case FETCH_ROLES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ROLES_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ROLES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ROLES_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ROLES_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ROLES_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_ROLES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_ROLES_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_ROLES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_ROLES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_ROLES_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_ROLES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_ROLES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_ROLES_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_ROLES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case ROLES_SET_CURRENT:
            return {
                ...state, 
                current: action.payload
            };
            // No break
        case ROLES_SET_META:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    ...action.meta
                }
            };
            // No break
        case ROLES_ADD_PERMISO_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case ROLES_ADD_PERMISO_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case ROLES_ADD_PERMISO_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case ROLES_DELETE_PERMISO_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case ROLES_DELETE_PERMISO_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case ROLES_DELETE_PERMISO_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        default:
            return state;
            // No break
    }
}