import { createSelector } from 'reselect';

const manifestSelector = state => state.manifest;

export const iconManifestSelector = createSelector(
    manifestSelector,
    manifest => manifest.iconManifest,
);
