import { APP_UPDATE, APP_MENU_DISPLAY } from "../actions/actions";

export function app(
    state = {
        section: 'start',
        module: '',
        menuDisplay: true
 }, action) {
    switch (action.type) {
        case APP_UPDATE:
            return {...state, ...action.payload};
            // No break
        case APP_MENU_DISPLAY:
            return {
                ...state,
                menuDisplay: !state.menuDisplay
            };
            // No break
        default:
            return state;
            // No break
    }
}