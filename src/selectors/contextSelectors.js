import { createSelector } from 'reselect';

import { clientsStateSelector } from './';

export const contextStateSelector = state => state.context;

/**
 * Retrieves the clientId from the context state.
 * @param {*} state Redux state object.
 */
export const contextClientIdSelector = createSelector(
    [contextStateSelector],
    context => context.clientId,
);

/**
 * Selector which returns the client matching the context client's id.
 * @param {*} state Redux state object.
 */
export const contextClientSelector = createSelector(
    [clientsStateSelector, contextClientIdSelector],
    (clients, clientId) => {
        if (!clients || !clients.length) {
            return undefined;
        }

        return clients.find(c => c.clientEntity.id === clientId);
    },
);
