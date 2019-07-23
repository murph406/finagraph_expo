export const SET_CONTEXT = 'Context/SET';
export const CLEAR_CONTEXT = 'Context/CLEAR';

/**
 * Clear current context state.
 */
export const clearContext = () =>
    (dispatch) => {
        dispatch({ type: CLEAR_CONTEXT });
    };

/**
 * Sets the context state.
 * @param {string} clientId Client to set the context to.
 */
export const setContext = clientId =>
    (dispatch) => {
        dispatch({ type: SET_CONTEXT, clientId });
    };
