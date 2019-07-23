// import { getClients } from '../../api';
// import { userAccountIdSelector } from '../../selectors';
// import { batchGetSubscriptions, getCashflow } from '../';

// export const SET_CLIENTS_DATA = 'SET_CLIENTS_DATA';
// export const getAccountClients = () => async (dispatch, getState) => {
//     const accountId = userAccountIdSelector(getState());
//     const clients = await getClients(accountId);

//     const clientIds = clients.filter(c => !c.clientEntity.isSampleBusiness).map(c => c.clientEntity.id);
//     const cashflowRequest = clients.map(c => ({
//         accountingPackage: c.clientEntity.accountingPackage,
//         entityId: c.clientEntity.entityId,
//         finagraphClientId: c.clientEntity.finagraphClientId,
//     }));

//     const subscriptionTask = dispatch(batchGetSubscriptions(clientIds));
//     const cashflowTask = dispatch(getCashflow(cashflowRequest));

//     dispatch({
//         type: SET_CLIENTS_DATA,
//         payload: {
//             clients,
//         },
//     });

//     await Promise.all([subscriptionTask, cashflowTask]);
// };
