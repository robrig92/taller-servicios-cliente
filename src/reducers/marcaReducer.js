import { 
    FETCH_MARCAS_REQUEST, 
    FETCH_MARCAS_SUCCESS, 
    FETCH_MARCAS_ERROR,
    INSERT_MARCAS_REQUEST,
    INSERT_MARCAS_SUCCESS,
    INSERT_MARCAS_ERROR,
    FETCH_MARCAS_BY_ID_REQUEST,
    FETCH_MARCAS_BY_ID_SUCCESS,
    FETCH_MARCAS_BY_ID_ERROR,
    MARCAS_SET_CURRENT,
    UPDATE_MARCAS_REQUEST,
    UPDATE_MARCAS_SUCCESS,
    UPDATE_MARCAS_ERROR,
    DELETE_MARCAS_REQUEST,
    DELETE_MARCAS_SUCCESS,
    DELETE_MARCAS_ERROR
} from "../actions/actions";

export function marca(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
 }, action) {
    switch (action.type) {
        case FETCH_MARCAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_MARCAS_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_MARCAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_MARCAS_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_MARCAS_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_MARCAS_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_MARCAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_MARCAS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_MARCAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_MARCAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_MARCAS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_MARCAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_MARCAS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_MARCAS_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_MARCAS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case MARCAS_SET_CURRENT:
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