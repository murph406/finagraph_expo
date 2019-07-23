import { API_ENDPOINT } from '../../env';
import store from '../store';
import { userIdTokenSelector } from '../selectors';

export * from './account';
export * from './clients';
export * from './feed';
export * from './login';
export * from './manifest';

/**
 * Uses the fetch Api to retrieve data from a remote url.
 * @param {string} url Url from which to retrieve information.
 * @param {RequestInit} params Fetch RequestInit object.
 * @param {string} apiVersion Api version, if not v1.
 * @returns {object} Json deserialized object.
 */
export default async function (url, params = {}, apiVersion = 'v1') {
    const myHeaders = new Headers();
    const authorization = `Bearer ${userIdTokenSelector(store.getState())}`;

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', authorization);

    const res = await fetch(`${API_ENDPOINT}/${apiVersion}${url}`, {
        headers: myHeaders,
        method: 'POST',
        ...params,
    });

    if (res.status < 200 || res.status >= 400) {
        let statusText = res.statusText;
        try {
            statusText = await res.text();
        } catch (error) {
            // Swallow
        }

        throw new Error(`Fetch request failed with status code ${res.status}: ${statusText}`);
    }

    return res.json();
}
