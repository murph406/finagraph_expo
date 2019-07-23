import { combineReducers } from 'redux';

import { reducer as cashflowReducer } from './cashflow/cashflow.reducer';
import clients from './clients/clients.reducer';
import { reducer as contextReducer } from './context/context.reducer';
import feed from './feed/feed.reducer';
import manifest from './manifest/manifest.reducer';
import network from './network/network.reducer';
import { reducer as subscriptionReducer } from './payment/subscriptions/subscriptions.reducer';
import user from './user/user.reducer';
import routes from './routes/routes.reducer';
import { reducer as accountDrawerReducer } from './accountDrawer/accountDrawer.reducer';

export default combineReducers({
    accountDrawer: accountDrawerReducer,
    cashflow: cashflowReducer,
    context: contextReducer,
    clients,
    feed,
    manifest,
    network,
    routes,
    subscription: subscriptionReducer,
    user,
});
