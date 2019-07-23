import * as Actions from './cashflow.actions';

const unloadedState = {
    cashflow: {},
    loading: false,
};

export const reducer = (state, action) => {
    let newState;

    switch (action.type) {
        case Actions.BATCH_GET_CASHFLOW:
            newState = {
                ...state,
                loading: true,
            };

            for (let i = 0; i < action.entityIds.length; i++) {
                const entityId = action.entityIds[i].entityId;
                newState.cashflow[entityId] = {
                    ...newState.cashflow[entityId],
                    loading: true,
                };
            }

            break;

        case Actions.BATCH_RECEIVE_CASHFLOW:
            newState = {
                ...state,
                loading: false,
            };

            if (action.error) {
                for (let i = 0; i < action.entityIds.length; i++) {
                    const entityId = action.entityIds[i].entityId;
                    newState.cashflow[entityId] = {
                        ...newState.cashflow[entityId],
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

                for (let i = 0; i < action.entityIds.length; i++) {
                    const entityId = action.entityIds[i].entityId;

                    const entry = dict[entityId];

                    newState.cashflow[entityId] = {
                        ...(entry || newState.cashflow[entityId]),
                        loading: false,
                    };
                }
            }

            break;

        case Actions.INIT_SAMPLE_BUSINESS:
            newState = {
                ...state,
                cashflow: {
                    ...state.cashflow,
                    [action.entityId]: {
                        ...action.payload,
                    },
                },
            };
            break;

        default:
            break;
    }

    return newState || state || unloadedState;
};
