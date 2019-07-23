import * as _ from 'lodash';

import { userAccountIdSelector, clientsSelector } from '../../selectors';
import fetchJson from '../../api';

export const BATCH_REQUEST_SUBSCRIPTIONS = 'Payment/BATCH_REQUEST_SUBSCRIPTIONS';
export const BATCH_RECEIVE_SUBSCRIPTIONS = 'Payment/BATCH_RECEIVE_SUBSCRIPTIONS';

const batchGetCustomersThunk = async (dispatch, getState, clientIds) => {
    dispatch({ type: BATCH_REQUEST_SUBSCRIPTIONS, clientIds });

    const request = {
        ids: clientIds,
    };

    try {
        const response = await fetchJson('/subscription/batch', { body: JSON.stringify(request) });

        dispatch({ type: BATCH_RECEIVE_SUBSCRIPTIONS, clientIds, payload: response });
    } catch (error) {
        dispatch({ type: BATCH_RECEIVE_SUBSCRIPTIONS, clientIds, error });
    }
};
const throttledGetCustomers = _.throttle(batchGetCustomersThunk, 2000, { leading: true, trailing: false });

/**
 * Retrieve payment customer information for the input clients, or, if omitted,
 * all clients in the store.
 * @param {string[]} clientIds ClientIds to retrieve Customers for. Optional.
 */
export function batchGetSubscriptions(clientIds) {
    return async (dispatch, getState) => {
        const state = getState();

        const accountId = userAccountIdSelector(state);

        if (!accountId) {
            throw new Error('AccountId is required to get subscriptions.');
        }

        let clientsToFetch = clientIds;

        if (!clientsToFetch || !clientsToFetch.length) {
            const clients = clientsSelector(state);

            clientsToFetch = clients && clients.map(c => c.clientEntity.id);
        }

        if (!clientsToFetch) {
            return [];
        }

        return throttledGetCustomers(dispatch, getState, clientsToFetch);
    };
}
