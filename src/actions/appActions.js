import {
    APP_UPDATE,
    APP_MENU_DISPLAY
} from "./actions";

export const appUpdate = (app) => {
    return {
        type: APP_UPDATE,
        payload: app
    };
}

export const appMenuDisplay = () => {
    return {
        type: APP_MENU_DISPLAY,
        payload: true
    }
}