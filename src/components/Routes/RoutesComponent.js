import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
// import { createShadow, lightGray } from '../../styles';

// import {
//     BusinessDashboard,
//     BusinessFeedTab,
//     CashflowTab,
//     CashflowView,
//     Feed,
//     Loader,
//     Login,
//     Navbar,
// } from '../index';
// import {
//     BUSINESS_DASHBOARD_NAME,
//     BUSINESS_FEED_NAME,
//     BUSINESS_VIEW,
//     CASHFLOW_VIEW,
//     LOGIN_NAME,
//     LOADER_NAME,
// } from '../../store/routes/routes.actions';

export default class Routes extends Component {
    render() {
        // const ConnectedRouter = connect()(Router);

        return (
            // <ConnectedRouter navBar={Navbar} hideNavBar={false}>
            //     <Scene key={'root'}>
            //         <Scene type={'reset'} key={LOGIN_NAME} component={Login} initial />

            //         <Scene type={'reset'} key={LOADER_NAME} component={Loader} name={'Loader'} />

            //         <Scene key={BUSINESS_DASHBOARD_NAME} component={BusinessDashboard} name={BUSINESS_DASHBOARD_NAME} />

            //         <Scene key={BUSINESS_VIEW} tabs hideNavBar={false} tabBarStyle={styles.bar}>
            //             <Scene key={BUSINESS_FEED_NAME} component={Feed} name={BUSINESS_FEED_NAME} icon={BusinessFeedTab} />
            //             <Scene key={CASHFLOW_VIEW} component={CashflowView} name={CASHFLOW_VIEW} icon={CashflowTab} />
            //         </Scene>
            //     </Scene>
            // </ConnectedRouter>
            <View style={{height: 100, width: 100, backgroundColor: 'red'}}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        // ...createShadow({ elevation: 6 }),
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        height: 48,
    },
})
