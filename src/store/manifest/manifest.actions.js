import { getIconManifest } from '../../api';

export const Manifest_ENSURE_ICONS = 'Manifest/ENSURE_ICONS';
export function ensureIconsAction() {
    return {
        type: Manifest_ENSURE_ICONS,
    };
}

export const Manifest_RECEIVE_ICON_MANIFEST = 'Manifest/RECEIVE_ICON_MANIFEST';
export function receiveIconManifest(payload, error) {
    return {
        type: Manifest_RECEIVE_ICON_MANIFEST,
        payload,
        error,
    };
}

export const ensureIcons = () => async (dispatch, getState) => {
    const state = getState();

    const iconManifest = state.manifest && state.manifest.iconManifest;
    if (!iconManifest ||
        ((!iconManifest.icons || Object.keys(iconManifest.icons).length === 0) && !state.manifest.loading)) {
        dispatch(ensureIconsAction());

        try {
            const receivedManifest = await getIconManifest();

            dispatch(receiveIconManifest(receivedManifest, undefined));
        } catch (e) {
            dispatch(receiveIconManifest(undefined, e));
        }
    }
};
