import { createReducer } from '../../helpers';

import {
    SET_ADD_ACTIVITY_FORM_IS_POSTING,
    SET_ADD_ACTIVITY_FORM_TEXT,
    TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION,
} from './feed.actions';

export const initialState = {
    isPosting: false,
    icon: '',
    sendNotification: true,
    text: '',
};

export default createReducer(initialState, {
    [SET_ADD_ACTIVITY_FORM_IS_POSTING]: (state, { payload: { isPosting } }) => ({
        ...state,
        isPosting,
    }),
    [SET_ADD_ACTIVITY_FORM_TEXT]: (state, { payload: { icon, text } }) => ({
        ...state,
        icon,
        text,
    }),
    [TOGGLE_ADD_ACTIVITY_SEND_NOTIFICATION]: state => ({
        ...state,
        sendNotification: !state.sendNotification,
    }),
});
