import { 
    FETCH_TIPO_EQUIPO_REQUEST, 
    FETCH_TIPO_EQUIPO_SUCCESS, 
    FETCH_TIPO_EQUIPO_ERROR,
    INSERT_TIPO_EQUIPO_REQUEST,
    INSERT_TIPO_EQUIPO_SUCCESS,
    INSERT_TIPO_EQUIPO_ERROR,
    FETCH_TIPO_EQUIPO_BY_ID_REQUEST,
    FETCH_TIPO_EQUIPO_BY_ID_SUCCESS,
    FETCH_TIPO_EQUIPO_BY_ID_ERROR,
    TIPO_EQUIPO_SET_CURRENT,
    UPDATE_TIPO_EQUIPO_REQUEST,
    UPDATE_TIPO_EQUIPO_SUCCESS,
    UPDATE_TIPO_EQUIPO_ERROR,
    DELETE_TIPO_EQUIPO_REQUEST,
    DELETE_TIPO_EQUIPO_SUCCESS,
    DELETE_TIPO_EQUIPO_ERROR
} from "../actions/actions";

export function tipoEquipo(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
 }, action) {
    switch (action.type) {
        case FETCH_TIPO_EQUIPO_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_TIPO_EQUIPO_SUCCESS:
            return {
                ...state, 
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_TIPO_EQUIPO_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_TIPO_EQUIPO_BY_ID_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_TIPO_EQUIPO_BY_ID_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_TIPO_EQUIPO_BY_ID_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_TIPO_EQUIPO_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_TIPO_EQUIPO_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_TIPO_EQUIPO_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_TIPO_EQUIPO_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_TIPO_EQUIPO_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_TIPO_EQUIPO_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_TIPO_EQUIPO_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_TIPO_EQUIPO_SUCCESS:
            return {
                ...state, 
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_TIPO_EQUIPO_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case TIPO_EQUIPO_SET_CURRENT:
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