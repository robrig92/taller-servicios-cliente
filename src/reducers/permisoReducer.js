import {
    FETCH_PERMISOS_REQUEST,
    FETCH_PERMISOS_SUCCESS,
    FETCH_PERMISOS_ERROR
} from "../actions/actions";

export function permiso(
    state = {
        items: [],
        current: {},
        requestStatus: 'loading',
        errors: []
    }, action) {
    switch (action.type) {
        case FETCH_PERMISOS_REQUEST:
            return {
                ...state,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_PERMISOS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                requestStatus: action.requestStatus
            };
            // No break
        case FETCH_PERMISOS_ERROR:
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