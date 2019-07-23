export * from './accountDrawer/accountDrawer.actions';
export * from './feed/feed.actions';
export * from './cashflow/cashflow.actions';
export * from './clients/clients.actions';
export * from './context/context.actions';
export * from './manifest/manifest.actions';
export * from './network/network.actions';
export * from './payment/payment.actions';
export * from './routes/routes.actions';
export * from './user/user.actions';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import { actionHistoryMiddleware } from './_middleware';
import reducer from './reducers';

export function configureStore() {
    const store = createStore(reducer, {}, composeWithDevTools(
        autoRehydrate(),
        applyMiddleware(thunk, actionHistoryMiddleware),
    ));

    if (module.hot) {
        module.hot.accept(() => {
            // eslint-disable-next-line global-require
            const nextReducer = require('./reducers').default;

            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export default configureStore();
