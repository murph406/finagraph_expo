import { feedType } from '../helpers/feed-type';

import fetchJSON from './';

/**
 * Gets the feed type and correct user Id based on input parameters.
 * @param {string} accountId Account id to compare.
 * @param {string} clientId Client id, if any.
 * @returns The correct type and userId, in an object.
 */
function getTypeAndSlug(accountId, clientId) {
    let type = feedType.Account;
    let userId = accountId;
    if (clientId) {
        type = feedType.Client;
        userId = clientId;
    }

    return {
        type,
        userId,
    };
}

/**
 * Fetch the given feed.
 * @param {string} feedId Feed id to fetch.
 * @param {string} accountId Account id of the current user.
 * @param {string} clientId Client who owns the feed, if any.
 */
export function fetchFeed(feedId, accountId, clientId) {
    const { type, userId } = getTypeAndSlug(accountId, clientId);

    return fetchJSON(`/feed/${type}/${userId}/feeds/${feedId}`, {
        method: 'GET',
    });
}

/**
 * Posts a comment to the given comment/feed.
 * @param {string} clientId Client who owns the feed, if any.
 * @param {string} currentUser User making the post.
 * @param {*} body Body, currentUser, parentPostId, parentPostObject, targetFeed object.
 */
export function postComment(clientId, currentUser, body) {
    const { type, userId } = getTypeAndSlug(currentUser, clientId);

    return fetchJSON(`/feed/${type}/${userId}/feeds/${body.targetFeed}/comment`, {
        body: JSON.stringify(body),
    });
}

/**
 * @param {string} clientId Client who owns the feed, if any.
 * @param {*} body actor, data, category, title, feed, type, verb of the activity.
 */
export function addActivity(clientId, body) {
    const idAndType = getTypeAndSlug(body.actor, clientId);

    return fetchJSON(`/feed/${idAndType.type}/${idAndType.userId}/feeds/${body.feed}/activity`, {
        body: JSON.stringify(body),
    });
}
