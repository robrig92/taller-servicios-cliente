import { 
    FETCH_EMPRESAS_REQUEST, 
    FETCH_EMPRESAS_SUCCESS, 
    FETCH_EMPRESAS_ERROR,
    INSERT_EMPRESAS_REQUEST,
    INSERT_EMPRESAS_SUCCESS,
    INSERT_EMPRESAS_ERROR,
    FETCH_EMPRESAS_BY_ID_REQUEST,
    FETCH_EMPRESAS_BY_ID_SUCCESS,
    FETCH_EMPRESAS_BY_ID_ERROR,
    EMPRESAS_SET_CURRENT,
    UPDATE_EMPRESAS_REQUEST,
    UPDATE_EMPRESAS_SUCCESS,
    UPDATE_EMPRESAS_ERROR,
    DELETE_EMPRESAS_REQUEST,
    DELETE_EMPRESAS_SUCCESS,
    DELETE_EMPRESAS_ERROR
} from "../actions/actions";

export function empresa(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
 }, action) {
    switch (action.type) {
        case FETCH_EMPRESAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_EMPRESAS_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_EMPRESAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_EMPRESAS_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_EMPRESAS_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_EMPRESAS_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_EMPRESAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_EMPRESAS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_EMPRESAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_EMPRESAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_EMPRESAS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_EMPRESAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_EMPRESAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_EMPRESAS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_EMPRESAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case EMPRESAS_SET_CURRENT:
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