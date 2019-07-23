import { createSelector } from 'reselect';

/**
 * Returns the cashflow store from redux.
 * @param {object} state Redux state object.
 */
export const cashflowStoreSelector = state => state.cashflow;

/**
 * Returns the cashflow data for the requested client by entity id.
 * @param {object} state Redux state object.
 * @param {string} entityId Entity id for which to retrieve cashflow data.
 */
export const cashflowByEntityIdSelector = createSelector(
    [cashflowStoreSelector, (state, clientId) => clientId],
    (cashflowStore, clientId) => cashflowStore && cashflowStore.cashflow && cashflowStore.cashflow[clientId],
);
