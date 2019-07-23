import { addActivity, fetchFeed, postComment } from '../../api';
import * as Selectors from '../../selectors';
import { trackUserCommentedOnACard, trackFeedLoadStart, trackFeedLoadComplete } from '../../services';
import CardTypes from '../../helpers/card-types';

export const ADD_CARDS_TO_FEED = 'Card/ADD_CARDS_TO_FEED';
export const ADD_COMMENT_TO_CARD = 'Card/ADD_COMMENT_TO_CARD';
export const CREATE_FEED = 'Feed/CREATE_FEED';
export const DESTROY_FEED = 'Feed/DESTROY_FEED';
export const REPLACE_FEED_CARDS = 'Feed/REPLACE_FEED_CARDS';
export const SET_ADD_ACTIVITY_FORM_IS_POSTING = 'Feed/SET_ADD_ACTIVITY_FORM_IS_POSTING';
export const SET_ADD_ACTIVITY_FORM_TEXT = 'Feed/SET_ADD_ACTIVITY_FORM_TEXT';
export const SET_CARD_COMMENT_FORM_SHOWN = 'Card/SET_CARD_COMMENT_FORM_SHOWN';
export const SET_CARD_COMMENT_FORM_IS_POSTING = 'Card/SET_CARD_COMMENT_FORM_IS_POSTING';
export const SET_CARD_COMMENT_FORM_TEXT = 'Card/SET_CARD_COMMENT_FORM_TEXT';
export const SET_FEED_IS_FETCHING = 'Feed/SET_FEED_IS_FETCHING';
export const TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION = 'Feed/TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION';
export const TOGGLE_CARD_COMMENT_SEND_NOTIFICATION = 'Card/TOGGLE_CARD_COMMENT_SEND_NOTIFICATION';

export function setFeedIsFetching(feedId, isFetching) {
    return {
        type: SET_FEED_IS_FETCHING,
        payload: {
            feedId,
            isFetching,
        },
    };
}

export function addCardsToFeed(feedId, cards, onTop = false) {
    return {
        type: ADD_CARDS_TO_FEED,
        payload: {
            feedId,
            cards,
            onTop,
        },
    };
}

export const createFeed = feedId => (dispatch, getState) => {
    const feedExists = Selectors.feedSelector(getState());

    if (!feedExists) {
        dispatch({
            type: CREATE_FEED,
            payload: {
                feedId,
            },
        });
    }
};

export const destroyFeed = feedId => (dispatch, getState) => {
    const feedExists = Selectors.feedSelector(getState());

    if (!feedExists) {
        dispatch({
            type: DESTROY_FEED,
            payload: {
                feedId,
            },
        });
    }
};

/**
 * Replaces all cards in the given feed with the input array.
 * @param {string} feedId Id of the feed whose cards should be replaced.
 * @param {Array<Card>} cards Cards to replace in the feed.
 */
export const replaceFeedCards = (feedId, cards) => (dispatch, getState) => {
    const state = getState();

    const currentFeed = Selectors.feedSelector(state, feedId);
    if (!currentFeed) {
        dispatch(createFeed(feedId));
    }

    dispatch({ type: REPLACE_FEED_CARDS, payload: { cards, feedId } });
};

/**
 * Gets the activities for the given feed Id and adds it to the store.
 * @param {string} feedId Feed id to fetch.
 * @param {boolean} isRefresh Whether the get action is refreshing a current feed. Forces
 * a fetch of the feed.
 * @returns {*} Thunk which will asynchronously retrieve the feed and add it to the store.
 */
export const getFeed = (feedId, isRefresh = false) => async (dispatch, getState) => {
    const state = getState();

    const isOnline = Selectors.isOnlineSelector(state);
    const isFetching = Selectors.feedIsFetchingSelector(state, feedId);
    const cards = Selectors.feedCardsSelector(state, feedId);
    const client = Selectors.clientByFeedIdSelector(state, feedId);

    if (isOnline && !isFetching && (!cards.length || isRefresh)) {
        dispatch(setFeedIsFetching(feedId, true));
        trackFeedLoadStart();

        const accountId = Selectors.userIdSelector(state);
        const clientId = client && client.id;

        const { cards } = await fetchFeed(feedId, accountId, clientId);

        trackFeedLoadComplete({ feedId });

        dispatch(replaceFeedCards(feedId, cards));
        dispatch(setFeedIsFetching(feedId, false));
    }
};

export function setAddActivityFormIsPosting(feedId, isPosting) {
    return {
        type: SET_ADD_ACTIVITY_FORM_IS_POSTING,
        payload: {
            feedId,
            isPosting,
        },
    };
}

export function setAddActivityFormContent(feedId, icon, text) {
    return {
        type: SET_ADD_ACTIVITY_FORM_TEXT,
        payload: {
            feedId,
            icon,
            text,
        },
    };
}

/** Toggles the status of the send notification flag. */
export function toggleSendNotification(feedId) {
    return {
        type: TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION,
        payload: {
            feedId,
        },
    };
}

export const addTextActivity = feed => async (dispatch, getState) => {
    const state = getState();

    const actor = Selectors.userIdSelector(state);
    const userFullName = Selectors.userFullNameSelector(state);
    const body = Selectors.feedAddActivityFormSelector(state, feed);
    const icon = Selectors.iconManifestSelector(state);
    const client = Selectors.clientByFeedIdSelector(state, feed);

    if (body.text.length) {
        dispatch(setAddActivityFormIsPosting(feed, true));

        const card = await addActivity(
            client && client.id, {
                feed,
                actor,
                category: 3,
                data: {
                    body: body.text,
                    heading: '',
                    iconName: body.icon,
                },
                important: body.sendNotification,
                title: `A message from ${userFullName}`,
                dataType: CardTypes.postTemplate,
                verb: 'post',
            });

        dispatch(addCardsToFeed(feed, [card], true));
        dispatch(setAddActivityFormIsPosting(feed, false));
        dispatch(setAddActivityFormContent(feed, icon.defaultIcon, ''));
    }
};

// Card
export function setCardCommentFormShown({ feedId, cardId, isShown }) {
    return {
        type: SET_CARD_COMMENT_FORM_SHOWN,
        payload: {
            feedId,
            cardId,
            isShown,
        },
    };
}

export function setCardCommentFormText({ feedId, cardId, body }) {
    return {
        type: SET_CARD_COMMENT_FORM_TEXT,
        payload: {
            feedId,
            cardId,
            body,
        },
    };
}

export function setCardCommentFormIsPosting({ feedId, cardId, isPosting }) {
    return {
        type: SET_CARD_COMMENT_FORM_IS_POSTING,
        payload: {
            feedId,
            cardId,
            isPosting,
        },
    };
}

export function toggleCardCommentSendNotification({ feedId, cardId }) {
    return {
        type: TOGGLE_CARD_COMMENT_SEND_NOTIFICATION,
        payload: {
            feedId,
            cardId,
        },
    };
}

export function addCommentToCard({ feedId, cardId, comment }) {
    return {
        type: ADD_COMMENT_TO_CARD,
        payload: {
            feedId,
            cardId,
            comment,
        },
    };
}

export const addComment = ({ feedId, cardId, parentPostObject }) => async (dispatch, getState) => {
    const state = getState();

    const userId = Selectors.userIdSelector(state);
    const body = Selectors.feedCardCommentBoxTextSelector(state, feedId, cardId);
    const client = Selectors.clientByFeedIdSelector(state, feedId);

    if (body.length) {
        const sendNotification = Selectors.feedCardSendNotificationSelector(state, feedId, cardId);

        dispatch(setCardCommentFormIsPosting({
            feedId,
            cardId,
            isPosting: true,
        }));

        const comment = await postComment(
            client && client.id,
            userId, {
                body,
                currentUser: userId,
                important: sendNotification,
                parentPostId: cardId,
                parentPostObject,
                targetFeed: feedId,
            });

        trackUserCommentedOnACard({
            feedId,
            cardId,
        });

        const commentId = comment.id;
        const commentExists = Selectors.feedCommentIfExistsSelector(getState(), feedId, cardId, commentId);

        dispatch(setCardCommentFormIsPosting({
            feedId,
            cardId,
            isPosting: false,
        }));

        if (!commentExists) {
            dispatch(addCommentToCard({
                feedId,
                cardId,
                comment,
            }));
        }

        dispatch(setCardCommentFormShown({
            feedId,
            cardId,
            isShown: false,
        }));

        dispatch(setCardCommentFormText({
            feedId,
            cardId,
            body: '',
        }));
    }
};

export const showCardCommentForm = ({ feedId, cardId }) => async (dispatch, getState) => {
    const isShowing = Selectors.feedCardCommentFormIsShownSelector(getState(), feedId, cardId);

    if (!isShowing) {
        dispatch(setCardCommentFormShown({
            feedId,
            cardId,
            isShown: true,
        }));
    }
};
