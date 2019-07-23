import { createReducer } from '../../helpers';

import {
    ADD_CARDS_TO_FEED,
    ADD_COMMENT_TO_CARD,
    CREATE_FEED,
    DESTROY_FEED,
    REPLACE_FEED_CARDS,
    SET_ADD_ACTIVITY_FORM_IS_POSTING,
    SET_ADD_ACTIVITY_FORM_TEXT,
    SET_CARD_COMMENT_FORM_IS_POSTING,
    SET_CARD_COMMENT_FORM_SHOWN,
    SET_CARD_COMMENT_FORM_TEXT,
    SET_FEED_IS_FETCHING,
    TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION,
    TOGGLE_CARD_COMMENT_SEND_NOTIFICATION,
} from './feed.actions';
import cards from './cards.reducer';
import addActivityForm from './addActivityForm.reducer';

const initialFeedState = {
    isFetching: false,
    cards: cards(),
    addActivityForm: addActivityForm(),
};

const destroyFeed = (state, action) => {
    const { payload: { feedId } } = action;

    return ({
        ...state,
        [feedId]: undefined,
    });
};

/**
 * Replaces all cards within a feed with payload. Ex: { type: REPLACE_FEED_CARDS, payload: { cards: [] } }
 * @param {*} state Feed state.
 * @param {*} action Action. Should contain type and cards (as payload).
 */
const replaceFeedCards = (state, action) => ({
    ...state,
    cards: cards([], action),
});

const updateAddActivityForm = (state, action) => ({
    ...state,
    addActivityForm: addActivityForm(state.addActivityForm, action),
});

const updateCards = (state, action) => ({
    ...state,
    cards: cards(state.cards, action),
});

const feedReducer = createReducer(initialFeedState, {
    [ADD_CARDS_TO_FEED]: updateCards,
    [ADD_COMMENT_TO_CARD]: updateCards,
    [CREATE_FEED]: state => state,
    [REPLACE_FEED_CARDS]: replaceFeedCards,
    [SET_ADD_ACTIVITY_FORM_IS_POSTING]: updateAddActivityForm,
    [SET_ADD_ACTIVITY_FORM_TEXT]: updateAddActivityForm,
    [SET_CARD_COMMENT_FORM_IS_POSTING]: updateCards,
    [SET_CARD_COMMENT_FORM_SHOWN]: updateCards,
    [SET_CARD_COMMENT_FORM_TEXT]: updateCards,
    [SET_FEED_IS_FETCHING]: (state, { payload: { isFetching } }) => ({
        ...state,
        isFetching,
    }),
    [TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION]: updateAddActivityForm,
    [TOGGLE_CARD_COMMENT_SEND_NOTIFICATION]: updateCards,
});

const updateFeed = (state, action) => {
    const { payload: { feedId } } = action;

    return ({
        ...state,
        [feedId]: feedReducer(state[feedId], action),
    });
};

export default createReducer({}, {
    [ADD_CARDS_TO_FEED]: updateFeed,
    [ADD_COMMENT_TO_CARD]: updateFeed,
    [CREATE_FEED]: updateFeed,
    [DESTROY_FEED]: destroyFeed,
    [REPLACE_FEED_CARDS]: updateFeed,
    [SET_ADD_ACTIVITY_FORM_IS_POSTING]: updateFeed,
    [SET_ADD_ACTIVITY_FORM_TEXT]: updateFeed,
    [SET_CARD_COMMENT_FORM_IS_POSTING]: updateFeed,
    [SET_CARD_COMMENT_FORM_SHOWN]: updateFeed,
    [SET_CARD_COMMENT_FORM_TEXT]: updateFeed,
    [SET_FEED_IS_FETCHING]: updateFeed,
    [TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION]: updateFeed,
    [TOGGLE_CARD_COMMENT_SEND_NOTIFICATION]: updateFeed,
});
