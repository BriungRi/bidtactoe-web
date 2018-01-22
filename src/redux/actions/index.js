export const LOG_IN = 'LOG_IN'
export const Page = {
    LOG_IN: 1,
    SIGN_UP: 2,
    MAIN_MENU: 3,
    INSTRUCTIONS: 4,
    GAME: 5,
    END_GAME: 6
}

export function logIn(email, password) {
    return {
        type: LOG_IN,
        payload: { email, password }
    };
}