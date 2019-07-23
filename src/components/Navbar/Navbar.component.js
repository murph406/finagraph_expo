import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    BUSINESS_DASHBOARD_NAME,
    BUSINESS_FEED_NAME,
    CASHFLOW_VIEW,
    goBack,
} from '../../store/routes/routes.actions';
import { AccountLogo, ClientLogo } from '../';

import styles from './Navbar.styles';

export default class Navbar extends PureComponent {
    static propTypes = {
        contextClient: PropTypes.shape({
            clientEntity: PropTypes.shape({
                id: PropTypes.string.isRequired,
            }).isRequired,
            logoDocumentId: PropTypes.string,
            logoFileName: PropTypes.string,
        }),
        name: PropTypes.string.isRequired,
        openAccountDrawer: PropTypes.func.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            profilePictureUrl: PropTypes.string,
        }),
    };

    static defaultProps = {
        contextClient: undefined,
        user: undefined,
    };

    getLeftContent = () => {
        const { name } = this.props;

        let content = false;
        switch (name) {
            case BUSINESS_DASHBOARD_NAME:
                content = (
                    <Text style={styles.text}>
                        Businesses
                    </Text>
                );
                break;
            case BUSINESS_FEED_NAME:
            case CASHFLOW_VIEW:
                content = (
                    <TouchableOpacity onPress={this.navigateBack} hitSlop={{ top: 9, bottom: 9, left: 9, right: 9 }}>
                        {/* <Icon name={'business'} style={[styles.text, styles.logoText]} /> */}
                    </TouchableOpacity>
                );
                break;
            default:
                break;
        }

        return content;
    }

    getMiddleContent = () => {
        const { contextClient, name } = this.props;

        let content;

        switch (name) {
            case BUSINESS_FEED_NAME:
            case CASHFLOW_VIEW:
                content = (
                    <ClientLogo client={contextClient} showBorder size={36} />
                );
                break;
            default:
                break;
        }

        return content;
    }

    getRightContent = () => {
        const { openAccountDrawer, user } = this.props;

        if (!user) {
            return false;
        }

        const content = (
            <AccountLogo
                onTap={openAccountDrawer}
                user={user}
            />
        );

        return content;
    }

    navigateBack = () => goBack(true);

    render() {
        const leftContent = this.getLeftContent();
        const middleContent = this.getMiddleContent();
        const rightContent = this.getRightContent();

        return (
            <View style={styles.container}>
                <View>{leftContent}</View>
                {middleContent && <View style={styles.middleContent}>{middleContent}</View>}
                <View style={styles.rightContent}>{rightContent}</View>
            </View>
        );
    }
}
