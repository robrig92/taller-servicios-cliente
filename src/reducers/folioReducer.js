import {
    FETCH_FOLIOS_REQUEST,
    FETCH_FOLIOS_SUCCESS,
    FETCH_FOLIOS_ERROR,
    INSERT_FOLIOS_REQUEST,
    INSERT_FOLIOS_SUCCESS,
    INSERT_FOLIOS_ERROR,
    FETCH_FOLIOS_BY_ID_REQUEST,
    FETCH_FOLIOS_BY_ID_SUCCESS,
    FETCH_FOLIOS_BY_ID_ERROR,
    FOLIOS_SET_CURRENT,
    UPDATE_FOLIOS_REQUEST,
    UPDATE_FOLIOS_SUCCESS,
    UPDATE_FOLIOS_ERROR,
    DELETE_FOLIOS_REQUEST,
    DELETE_FOLIOS_SUCCESS,
    DELETE_FOLIOS_ERROR
} from "../actions/actions";

export function folio(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
    }, action) {
    switch (action.type) {
        case FETCH_FOLIOS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_FOLIOS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_FOLIOS_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_FOLIOS_BY_ID_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_FOLIOS_BY_ID_SUCCESS:
            return {
                ...state,
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_FOLIOS_BY_ID_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_FOLIOS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_FOLIOS_SUCCESS:
            return {
                ...state,
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case INSERT_FOLIOS_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_FOLIOS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_FOLIOS_SUCCESS:
            return {
                ...state,
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case UPDATE_FOLIOS_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_FOLIOS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_FOLIOS_SUCCESS:
            return {
                ...state,
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case DELETE_FOLIOS_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FOLIOS_SET_CURRENT:
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