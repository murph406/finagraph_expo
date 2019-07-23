import { connect } from 'react-redux';

import { openAccountDrawer } from '../../store';
import { contextClientSelector, userSelector } from '../../selectors';

import Navbar from './Navbar.component';

export default connect(
    state => ({
        contextClient: contextClientSelector(state),
        user: userSelector(state),
    }),
    {
        openAccountDrawer,
    },
)(Navbar);
