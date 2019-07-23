import { createReducer } from '../../helpers';

import {
    ADD_CARDS_TO_FEED,
    ADD_COMMENT_TO_CARD,
    REPLACE_FEED_CARDS,
    SET_CARD_COMMENT_FORM_IS_POSTING,
    SET_CARD_COMMENT_FORM_SHOWN,
    SET_CARD_COMMENT_FORM_TEXT,
    TOGGLE_CARD_COMMENT_SEND_NOTIFICATION,
} from './feed.actions';
import cardReducer from './card.reducer';

const initialState = [];

const addCards = (state, action) => {
    const { payload: { cards, onTop } } = action;
    const newCards = cards.map(card => cardReducer(undefined, {
        type: ADD_CARDS_TO_FEED,
        payload: {
            card,
        },
    }));

    return onTop ? ([
        ...newCards,
        ...state,
    ]) : ([
        ...state,
        ...newCards,
    ]);
};

const updateCard = (state, action) => {
    const { payload: { cardId } } = action;

    return state.map(card => card.activity.id === cardId ? cardReducer(card, action) : card);
};

export default createReducer(initialState, {
    [ADD_CARDS_TO_FEED]: addCards,
    [ADD_COMMENT_TO_CARD]: updateCard,
    [REPLACE_FEED_CARDS]: addCards,
    [SET_CARD_COMMENT_FORM_IS_POSTING]: updateCard,
    [SET_CARD_COMMENT_FORM_SHOWN]: updateCard,
    [SET_CARD_COMMENT_FORM_TEXT]: updateCard,
    [TOGGLE_CARD_COMMENT_SEND_NOTIFICATION]: updateCard,
});
