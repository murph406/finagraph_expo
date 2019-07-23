import { createReducer } from '../../helpers';

import { SET_CLIENTS_DATA } from './clients.actions';

const setClientsData = (state, { payload: { clients } }) => clients;

export default createReducer([], {
    [SET_CLIENTS_DATA]: setClientsData,
});
