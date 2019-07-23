import fetchJSON from './';

export function getIconManifest() {
    return fetchJSON('/manifest/icon', {
        method: 'GET',
    });
}
