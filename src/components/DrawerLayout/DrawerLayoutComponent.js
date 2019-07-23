import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,View } from 'react-native';

// import { AccountDrawer } from '../';

class DrawerLayoutComponent extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]).isRequired,
    };

    render() {
        return (
            <View style={styles.container}>
                {/* <AccountDrawer /> */}
                {this.props.children}
            </View>
        );
    }
}

export default DrawerLayoutComponent;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        zIndex: 1,
    },
})
