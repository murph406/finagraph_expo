import { createReducer } from '../../helpers';

import {
    SET_IS_OFFLINE,
    SET_IS_ONLINE,
} from './network.actions';

const initialState = {
    isOnline: true,
};

const setIsOffline = state => ({
    ...state,
    isOnline: false,
});

const setIsOnline = state => ({
    ...state,
    isOnline: true,
});

export default createReducer(initialState, {
    [SET_IS_OFFLINE]: setIsOffline,
    [SET_IS_ONLINE]: setIsOnline,
});
