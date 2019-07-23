import { Platform } from 'react-native';

import fetchJSON from './';

export function getPostLoginUserData(state, isSignup) {
    const body = {
        invitationLinkToken: null,
        isSignup,
    };

    if (state.user.user.pushToken) {
        body.pushTokenRequest = {
            platform: Platform.OS,
            newDeviceId: state.user.user.pushToken,
        };
    }

    return fetchJSON('/Login/postLogin', {
        body: JSON.stringify(body),
    });
}

/**
 * Make a request to check if the given accountId exists in the system.
 * @param {string} accountId Account Id to test.
 * @returns {boolean} True if exists; otherwise, false.
 */
export function getUserAccountExists(accountId) {
    return fetchJSON(`/account/${accountId}/exists`, { method: 'GET' });
}
