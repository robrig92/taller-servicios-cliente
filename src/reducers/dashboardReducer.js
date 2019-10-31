import { 
    FETCH_COUNTS_REQUEST,
    FETCH_COUNTS_SUCCESS,
    FETCH_COUNTS_ERROR,
    FETCH_FOLIOS_BY_ESTATUS_REQUEST,
    FETCH_FOLIOS_BY_ESTATUS_SUCCESS,
    FETCH_FOLIOS_BY_ESTATUS_ERROR,
    FETCH_FOLIOS_BY_USUARIO_CREADOR_REQUEST,
    FETCH_FOLIOS_BY_USUARIO_CREADOR_SUCCESS,
    FETCH_FOLIOS_BY_USUARIO_CREADOR_ERROR,
    FETCH_FOLIOS_BY_USUARIO_ASIGNADO_REQUEST,
    FETCH_FOLIOS_BY_USUARIO_ASIGNADO_SUCCESS,
    FETCH_FOLIOS_BY_USUARIO_ASIGNADO_ERROR
} from "../actions/actions";

export function dashboard(
    state = {
        counts: {},
        foliosByEstatus: [],
        foliosByUsuarioCreador: [],
        foliosByUsuarioAsignado: [],
        requestStatus: 'loading',
        errors: []
 }, action) {
    switch (action.type) {
        case FETCH_COUNTS_REQUEST:
            return {
                ...state, 
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_COUNTS_SUCCESS:
            return {
                ...state, 
                counts: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_COUNTS_ERROR:
            return {
                ...state, 
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_FOLIOS_BY_ESTATUS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_ESTATUS_SUCCESS:
            return {
                ...state,
                foliosByEstatus: action.payload,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_ESTATUS_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_USUARIO_CREADOR_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_USUARIO_CREADOR_SUCCESS:
            return {
                ...state,
                foliosByUsuarioCreador: action.payload,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_USUARIO_CREADOR_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_USUARIO_ASIGNADO_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_USUARIO_ASIGNADO_SUCCESS:
            return {
                ...state,
                foliosByUsuarioAsignado: action.payload,
                requestStatus: action.requestStatus
            };
        // No break
        case FETCH_FOLIOS_BY_USUARIO_ASIGNADO_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
        // No break
        default:
            return state;
            // No breal
        }
    }