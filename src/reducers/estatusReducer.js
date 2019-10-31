import {
    FETCH_ESTATUS_REQUEST,
    FETCH_ESTATUS_SUCCESS,
    FETCH_ESTATUS_ERROR,
    FETCH_ESTATUS_BY_ID_REQUEST,
    FETCH_ESTATUS_BY_ID_SUCCESS,
    FETCH_ESTATUS_BY_ID_ERROR,
    ESTATUS_SET_CURRENT
} from "../actions/actions";

export function estatus(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
    }, action) {
    switch (action.type) {
        case FETCH_ESTATUS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ESTATUS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ESTATUS_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ESTATUS_BY_ID_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ESTATUS_BY_ID_SUCCESS:
            return {
                ...state,
                current: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_ESTATUS_BY_ID_ERROR:
            return {
                ...state,
                errors: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case ESTATUS_SET_CURRENT:
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