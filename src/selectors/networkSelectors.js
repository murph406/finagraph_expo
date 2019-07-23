import { createSelector } from 'reselect';

const networkSelector = state => state.network;

export const isOnlineSelector = createSelector(
    networkSelector,
    network => network.isOnline,
);
