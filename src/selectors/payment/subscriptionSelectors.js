import { createSelector } from 'reselect';

/**
 * Returns the subscription store.
 * @param {object} state Redux state object.
 */
export const subscriptionStateSelector = state => state.subscription;

/**
 * Returns the subscription associated with the input clientId,
 * @param {object} state Redux state object.
 * @param {string} clientId Client for which to retrieve the subscription.
 */
export const subscriptionByClientIdSelector = createSelector(
    [subscriptionStateSelector, (state, clientId) => clientId],
    (subscriptionStore, clientId) =>
        subscriptionStore &&
            subscriptionStore.subscriptions &&
            subscriptionStore.subscriptions[clientId],
);
