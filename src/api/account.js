import { Platform } from 'react-native';

import fetchJSON from './';

/**
 * Upserts the push notification token for the given user.
 * @param {string} accountId AccountId to update the token for.
 * @param {string} oldToken Current token.
 * @param {string} newToken New token.
 */
export function upsertPushToken(accountId, oldToken, newToken) {
    const request = {
        currentDeviceId: oldToken,
        newDeviceId: newToken,
        platform: Platform.OS,
    };

    return fetchJSON(`/profile/${accountId}/pushtoken`, {
        body: JSON.stringify(request),
    });
}
