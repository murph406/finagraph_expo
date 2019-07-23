import * as PaymentActions from '../payment.actions';

const unloadedState = {
    subscriptions: {},
    loading: false,
};

export const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case PaymentActions.BATCH_REQUEST_SUBSCRIPTIONS:
            newState = {
                ...state,
                loading: true,
            };

            for (let i = 0; i < action.clientIds.length; i++) {
                const clientId = action.clientIds[i];
                newState.subscriptions[clientId] = {
                    ...newState.subscriptions[clientId],
                    loading: true,
                };
            }
            break;
        case PaymentActions.BATCH_RECEIVE_SUBSCRIPTIONS:
            newState = {
                ...state,
                loading: false,
            };

            if (action.error) {
                for (let i = 0; i < action.clientIds.length; i++) {
                    const clientId = action.clientIds[i];
                    newState.subscriptions[clientId] = {
                        ...newState.subscriptions[clientId],
                        loading: false,
                    };
                }
            } else {
                const dict = action.payload.reduce(
                    (map, cur) => {
                        map[cur.id] = cur.payload;

                        return map;
                    },
                    {},
                );

                for (let i = 0; i < action.clientIds.length; i++) {
                    const clientId = action.clientIds[i];

                    const entry = dict[clientId];

                    newState.subscriptions[clientId] = {
                        ...(entry || newState.subscriptions[clientId]),
                        loading: false,
                    };
                }
            }

            break;
        default:
            break;
    }

    return newState || state || unloadedState;
};
