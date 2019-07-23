import { ActionConst } from 'react-native-router-flux';

import { createReducer } from '../../helpers';

const initialState = {
    scene: null,
};

const setScene = (state, { scene }) => ({
    ...state,
    scene,
});

export default createReducer(initialState, {
    [ActionConst.FOCUS]: setScene,
});
