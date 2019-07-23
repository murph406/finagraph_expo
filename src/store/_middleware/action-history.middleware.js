const HISTORY_SIZE = 10;
const actionHistory = [];

const addToActionHistory = (action) => {
    if (actionHistory.length >= HISTORY_SIZE) {
        actionHistory.shift();
    }
    actionHistory.push(action);
};

export const actionHistoryMiddleware = () => next => (action) => {
    if (typeof action !== 'function') {
        addToActionHistory(action);
    }

    return next(action);
};

export default actionHistory;
