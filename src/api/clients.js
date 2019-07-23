import fetchJSON from './';

export function getClients(accountId) {
    return fetchJSON(`/profile/${accountId}/clients`, {
        method: 'GET',
    });
}
