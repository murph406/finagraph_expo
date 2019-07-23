/**
 * Returns the current user if it is loaded; otherwise returns undefined.
 * @param {*} state Redux state object.
 */
export const userSelector = state => (state.user && state.user.user && state.user.user.id) ? state.user.user : undefined;

export const userIdTokenSelector = state => state.user.user.idToken;
export const userIdSelector = state => state.user.user.id;
export const userFullNameSelector = state => state.user.user.fullName;
export const userFirstNameSelector = state => state.user.user.firstName;
export const userLastNameSelector = state => state.user.user.lastName;

export const userAccountIdSelector = state => state.user.user.id;

// eslint-disable-next-line no-unused-vars
export const userIsAdvisorSelector = state => true;
export const userFeedIdSelector = state => state.user.flight.feedId;

export const userBusinessNameSelector = state => userFullNameSelector(state);

export const userEmailSelector = state => state.user.user.email;
