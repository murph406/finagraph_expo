export const BATCH_GET_CASHFLOW = 'Cashflow/BATCH_GET_CASHFLOW';
export const BATCH_RECEIVE_CASHFLOW = 'Cashflow/BATCH_RECEIVE_CASHFLOW';
export const INIT_SAMPLE_BUSINESS = 'Cashflow/INIT_SAMPLE_BUSINESS';

import { clientsSelector } from '../../selectors';
import fetchJson from '../../api';

/**
 * Retrieve cashflow information for the requested clients.
 * @param {object[]} cashflowRequest Array of client Ids to retrieve cashflow for. If omitted, all
 * clients in the store will be retrieved.
 */
export function getCashflow(cashflowRequest) {
    return async (dispatch, getState) => {
        let requests = cashflowRequest;
        if (!requests || !requests.length) {
            const state = getState();
            const clients = clientsSelector(state, true);
            requests = clients.map(c => ({
                accountingPackage: c.clientEntity.accountingPackage,
                entityId: c.clientEntity.entityId,
                finagraphClientId: c.clientEntity.finagraphClientId,
            }));
        }

        if (!requests || !requests.length) {
            return;
        }

        dispatch({ type: BATCH_GET_CASHFLOW, entityIds: requests });

        const request = {
            requests,
        };

        try {
            const response = await fetchJson('/cashflow', { body: JSON.stringify(request) }, 'v2');

            dispatch(({ type: BATCH_RECEIVE_CASHFLOW, entityIds: requests, payload: response }));
        } catch (error) {
            dispatch({ type: BATCH_RECEIVE_CASHFLOW, entityIds: requests, error });
        }
    };
}
