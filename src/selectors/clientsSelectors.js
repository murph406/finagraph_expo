import { createSelector } from 'reselect';

export const clientsStateSelector = state => state.clients;

/**
 * Retrieve a list of clients from state.
 * @param {object} state The redux state.
 * @param {boolean} includeSampleBusiness Whether to include the sample business in the results.
 * @returns {Array} Returns an array of matching clients (empty, if state is undefined or none match).
 */
export const clientsSelector = createSelector(
    [clientsStateSelector, (state, includeSampleBusiness) => (includeSampleBusiness || false)],
    (clients, includeSampleBusiness) => {
        if (includeSampleBusiness) {
            return (clients || []);
        }

        return (clients && clients.filter(c => !c.clientEntity.isSampleBusiness)) || [];
    },
);

/**
 * Returns a client from state with the given feedId.
 * @param state State to pull from.
 * @param feedId Feed id to compare to the client.
 * @returns The matching clientEntity, or undefined if none is found.
 */
export const clientByFeedIdSelector = createSelector(
    [clientsStateSelector, (state, feedId) => feedId],
    (clients, feedId) => {
        const entry = clients && clients.find(clientEntry => clientEntry.clientEntity.feedId === feedId);

        return (entry && entry.clientEntity) || undefined;
    },
);

/**
 * Returns the client name and feed id of all clients in state.
 * @param state Current redux state.
 * @returns An array of feed Id (id) and business name (name) objects.
 */
export const clientsNameAndFeedIdSelector = createSelector(
    [clientsStateSelector],
    clients => clients.map(({ clientEntity: { business, businessView, feedId } }) => ({
        id: feedId,
        name: (businessView && businessView.name) || (business && business.name),
    })),
);

/**
 * Returns the client name of the client with the matching feed id.
 * @param state Current redux state.
 * @param feedId Feed id to compare.
 * @returns Client business name.
 */
export const clientNameSelector = createSelector(
    [clientByFeedIdSelector],
    client => client && (client.businessView.name || client.business.name),
);

/**
 * Return the sample business from the store, if any.
 * @param state Current redux state.
 */
export const sampleBusinessSelector = createSelector(
    [clientsStateSelector],
    clients => clients && clients.find(c => c.clientEntity.isSampleBusiness),
);
