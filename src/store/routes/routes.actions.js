import { InteractionManager } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import bugsnag from '../../services/bugsnag.service';
import { trackView } from '../../services';
import store, { clearContext, getAccountClients, setContext } from '../../store';

export const LOADER_NAME = 'Loader';
export const FEED_NAME = 'Feed';
export const BUSINESS_VIEW = 'BusinessView';
export const BUSINESS_FEED_NAME = 'BusinessFeed';
export const BUSINESS_DASHBOARD_NAME = 'BusinessDashboard';
export const CASHFLOW_VIEW = 'CashflowView';
export const LOGIN_NAME = 'Login';

function runAfterInteractions() {
    return new Promise((resolve) => {
        InteractionManager.runAfterInteractions(resolve);
    });
}

async function goTo(name, data = {}) {
    const { analyticsData, props = {} } = data;

    await runAfterInteractions();

    bugsnag.leaveBreadcrumb(name);

    trackView(name, analyticsData);

    Actions[name](props);
}

export function goBack(getClients) {
    if (getClients) {
        store.dispatch(getAccountClients());
    }

    Actions.pop();
}

export function goToLoader() {
    return goTo(LOADER_NAME);
}

/**
 * Navigates to the base view.
 */
export function goToDefaultView(getClients = false) {
    if (getClients) {
        store.dispatch(getAccountClients());
    }

    return goTo(BUSINESS_DASHBOARD_NAME, { props: { type: ActionConst.RESET } });
}

/**
 * Navigates to a client view.
 * @param {*} id Id of the client to navigate to.
 * @param {*} analyticsData Any additional analytics data to include.
 */
export function goToClientView(id, analyticsData = {}) {
    store.dispatch(setContext(id));

    return goTo(BUSINESS_VIEW, {
        props: {
            id,
        },
        analyticsData: {
            ...analyticsData,
            ['Client Id']: id,
        },
    });
}

export function goToLogin() {
    Actions[LOGIN_NAME]();

    store.dispatch(clearContext());
}
