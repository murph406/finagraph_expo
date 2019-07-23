import { createSelector } from 'reselect';

const feedsSelector = state => state.feed;

/**
 * Get feed by feedId.
 * @param {*} state Current redux state.
 * @param {string} id Id of the feed to retrieve.
*/
export const feedSelector = createSelector(
    [feedsSelector, (state, id) => id],
    (feeds, id) => feeds[id],
);

/**
 * Get the current user's feed Id.
 * @param {*} state Current redux state.
 */
export const feedId = state => state.user.flight.feedId;

export const feedIsFetchingSelector = createSelector(
    [feedSelector],
    feed => !!feed && feed.isFetching,
);

export const feedCardsSelector = createSelector(
    [feedSelector, (state, feedId, includeAddActivity) => includeAddActivity],
    (feedState, includeAddActivity) => {
        const feed = [
            ...((!!feedState && feedState.cards) || []),
        ];

        if (includeAddActivity) {
            feed.unshift({
                activity: {
                    id: 'add-activity-form',
                    dataType: 'add-activity-form',
                },
            });
        }

        return feed;
    },
);

export const feedAddActivityFormSelector = createSelector(
    [feedSelector],
    feed => feed && feed.addActivityForm,
);

export const feedAddActivityFormIsPostingSelector = createSelector(
    [feedAddActivityFormSelector],
    form => !!(form && form.isPosting),
);

export const feedAddActivityFormContentSelector = createSelector(
    [feedAddActivityFormSelector],
    form => ({
        icon: form && form.icon,
        sendNotification: !!(form && form.sendNotification),
        text: (form && form.text) || '',
    }),
);

export const feedCardSelector = createSelector(
    [feedCardsSelector, (state, feedId, cardId) => cardId],
    (cards, cardId) => cards.find(({ activity: { id } }) => id === cardId),
);

export const feedGetCardIdByObjectIdSelector = createSelector(
    [feedCardsSelector, (state, feedId, objectId) => objectId],
    (cards, objectId) => cards.find(({ activity: { object } }) => object === objectId).activity.id,
);

export const feedCommentIfExistsSelector = createSelector(
    [feedCardSelector, (state, feedId, cardId, commentId) => commentId],
    (card, commentId) => !!(card.comments && card.comments.some(({ id }) => id === commentId)),
);

export const feedCardCommentFormIsShownSelector = createSelector(
    [feedCardSelector],
    card => card.commentFormShown,
);

export const feedCardCommentBoxTextSelector = createSelector(
    [feedCardSelector],
    card => card.commentBox,
);

export const feedCardIsPostingCommentSelector = createSelector(
    [feedCardSelector],
    card => card.isPostingComment,
);

export const feedCardSendNotificationSelector = createSelector(
    [feedCardSelector],
    card => card.sendNotification,
);
