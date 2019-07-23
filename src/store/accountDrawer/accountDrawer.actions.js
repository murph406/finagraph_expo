export const CLOSE_ACCOUNT_DRAWER = 'AccountDrawer/CLOSE';
export const OPEN_ACCOUNT_DRAWER = 'AccountDrawer/OPEN';

export function closeAccountDrawer() {
    return (dispatch) => {
        dispatch({ type: CLOSE_ACCOUNT_DRAWER });
    };
}

export function openAccountDrawer() {
    return (dispatch) => {
        dispatch({ type: OPEN_ACCOUNT_DRAWER });
    };
}
