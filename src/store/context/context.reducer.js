import * as ContextActions from './context.actions';

const unloadedState = {
    clientId: undefined,
};

export const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case ContextActions.CLEAR_CONTEXT:
            newState = { ...unloadedState };
            break;
        case ContextActions.SET_CONTEXT:
            newState = {
                ...state,
                clientId: action.clientId,
            };
            break;
        default:
            break;
    }

    return newState || state || unloadedState;
};
