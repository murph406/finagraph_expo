import { createReducer } from '../../helpers';

import {
    ADD_CARDS_TO_FEED,
    ADD_COMMENT_TO_CARD,
    SET_CARD_COMMENT_FORM_IS_POSTING,
    SET_CARD_COMMENT_FORM_SHOWN,
    SET_CARD_COMMENT_FORM_TEXT,
    TOGGLE_CARD_COMMENT_SEND_NOTIFICATION,
} from './feed.actions';

const initialState = {
    isPostingComment: false,
    commentBox: '',
    commentFormShown: false,
    comments: [],
    sendNotification: true,
};

export default createReducer(initialState, {
    [ADD_CARDS_TO_FEED]: (state, { payload: { card } }) => ({
        ...state,
        ...card,
    }),
    [SET_CARD_COMMENT_FORM_IS_POSTING]: (state, { payload: { isPosting } }) => ({
        ...state,
        isPostingComment: isPosting,
    }),
    [ADD_COMMENT_TO_CARD]: (state, { payload: { comment } }) => ({
        ...state,
        comments: [
            ...(state.comments || []),
            comment,
        ],
    }),
    [SET_CARD_COMMENT_FORM_SHOWN]: (state, { payload: { isShown } }) => ({
        ...state,
        commentFormShown: isShown,
    }),
    [SET_CARD_COMMENT_FORM_TEXT]: (state, { payload: { body } }) => ({
        ...state,
        commentBox: body,
    }),
    [TOGGLE_CARD_COMMENT_SEND_NOTIFICATION]: state => ({
        ...state,
        sendNotification: !state.sendNotification,
    }),
});
