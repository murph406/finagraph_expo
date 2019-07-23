import * as Actions from './accountDrawer.actions';

const unloadedState = {
    isOpen: false,
};

export const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case Actions.CLOSE_ACCOUNT_DRAWER:
            newState = {
                ...state,
                isOpen: false,
            };
            break;

        case Actions.OPEN_ACCOUNT_DRAWER:
            newState = {
                ...state,
                isOpen: true,
            };
            break;

        default:
            break;
    }

    return newState || state || unloadedState;
};
