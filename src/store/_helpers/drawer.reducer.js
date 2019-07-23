import { createReducer } from '../../helpers';

export default function DrawerReducer(OPEN, CLOSE) {
    const open = () => true;
    const close = () => false;

    return createReducer(false, {
        [OPEN]: open,
        [CLOSE]: close,
    });
}
