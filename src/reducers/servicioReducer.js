import { 
    FETCH_SERVICIOS_REQUEST, 
    FETCH_SERVICIOS_SUCCESS, 
    FETCH_SERVICIOS_ERROR,
    INSERT_SERVICIOS_REQUEST,
    INSERT_SERVICIOS_SUCCESS,
    INSERT_SERVICIOS_ERROR,
    FETCH_SERVICIOS_BY_ID_REQUEST,
    FETCH_SERVICIOS_BY_ID_SUCCESS,
    FETCH_SERVICIOS_BY_ID_ERROR,
    SERVICIOS_SET_CURRENT,
    UPDATE_SERVICIOS_REQUEST,
    UPDATE_SERVICIOS_SUCCESS,
    UPDATE_SERVICIOS_ERROR,
    DELETE_SERVICIOS_REQUEST,
    DELETE_SERVICIOS_SUCCESS,
    DELETE_SERVICIOS_ERROR
} from "../actions/actions";

export function servicio(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
 }, action) {
    switch (action.type) {
        case FETCH_SERVICIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_SERVICIOS_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_SERVICIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_SERVICIOS_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_SERVICIOS_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_SERVICIOS_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_SERVICIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_SERVICIOS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_SERVICIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_SERVICIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_SERVICIOS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_SERVICIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_SERVICIOS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_SERVICIOS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_SERVICIOS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case SERVICIOS_SET_CURRENT:
            return {
                ...state, 
                current: action.payload
            };
            // No break
        default:
            return state;
            // No break
    }
}