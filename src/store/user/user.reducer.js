import { createReducer } from '../../helpers';

import {
    SET_USER_DATA,
    RESET_USER_DATA,
    SET_USER_FLIGHT_DATA,
    RESET_USER_FLIGHT_DATA,
} from './user.actions';

const initialState = {
    user: {},
    flight: {},
};

const setUserData = (state, { payload }) => ({
    ...state,
    user: {
        ...state.user,
        ...payload,
    },
});

const resetUserData = state => ({
    ...state,
    user: {},
});

const setUserFlightData = (state, { payload }) => ({
    ...state,
    flight: {
        ...state.flight,
        ...payload,
    },
});

const resetUserFlightData = state => ({
    ...state,
    flight: {},
});

export default createReducer(initialState, {
    [SET_USER_DATA]: setUserData,
    [RESET_USER_DATA]: resetUserData,
    [SET_USER_FLIGHT_DATA]: setUserFlightData,
    [RESET_USER_FLIGHT_DATA]: resetUserFlightData,
});
