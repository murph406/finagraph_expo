import { createReducer } from '../../helpers';

import {
    Manifest_ENSURE_ICONS,
    Manifest_RECEIVE_ICON_MANIFEST,
} from './manifest.actions';

const initialState = {
    iconManifest: {
        defaultIcon: undefined,
        hiddenIcon: undefined,
        icons: {},
    },
};

const ensureIconManifest = state => ({
    ...(state || initialState),
});

const receiveIconManifest = (state, { payload, error }) => ({
    ...state,
    iconManifest: (!error && payload)
        ? ({
            defaultIcon: payload.defaultIcon,
            hiddenIcon: payload.hiddenIcon,
            icons: (payload.icons || []).reduce((obj, value) => {
                obj[value.name] = value;
                return obj;
            }, {}),
        })
        : undefined,
});

export default createReducer(initialState, {
    [Manifest_ENSURE_ICONS]: ensureIconManifest,
    [Manifest_RECEIVE_ICON_MANIFEST]: receiveIconManifest,
});
