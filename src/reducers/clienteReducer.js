import { 
    FETCH_CLIENTES_REQUEST, 
    FETCH_CLIENTES_SUCCESS, 
    FETCH_CLIENTES_ERROR,
    INSERT_CLIENTES_REQUEST,
    INSERT_CLIENTES_SUCCESS,
    INSERT_CLIENTES_ERROR,
    FETCH_CLIENTES_BY_ID_REQUEST,
    FETCH_CLIENTES_BY_ID_SUCCESS,
    FETCH_CLIENTES_BY_ID_ERROR,
    CLIENTES_SET_CURRENT,
    UPDATE_CLIENTES_REQUEST,
    UPDATE_CLIENTES_SUCCESS,
    UPDATE_CLIENTES_ERROR,
    DELETE_CLIENTES_REQUEST,
    DELETE_CLIENTES_SUCCESS,
    DELETE_CLIENTES_ERROR
} from "../actions/actions";

export function cliente(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
 }, action) {
    switch (action.type) {
        case FETCH_CLIENTES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_CLIENTES_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_CLIENTES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_CLIENTES_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_CLIENTES_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_CLIENTES_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_CLIENTES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_CLIENTES_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_CLIENTES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_CLIENTES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_CLIENTES_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_CLIENTES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_CLIENTES_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_CLIENTES_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_CLIENTES_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case CLIENTES_SET_CURRENT:
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