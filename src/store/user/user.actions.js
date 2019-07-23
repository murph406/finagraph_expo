import { Alert, Platform } from 'react-native';

import { splitFullName } from '../../helpers';
import {
    showLogin,
    trackLoggedIn,
    trackLoggedOut,
    setUserProps,
    getCurrentUser,
    getUserInfo,
    bugsnag,
} from '../../services';
import { getPostLoginUserData, getUserAccountExists } from '../../api/login';
import { getAccountClients } from '../';
import { goToLogin } from '../routes/routes.actions';

export const RESET_USER_FLIGHT_DATA = 'RESET_USER_FLIGHT_DATA';
export const resetUserFlightData = () => ({
    type: RESET_USER_FLIGHT_DATA,
});

export const SET_USER_FLIGHT_DATA = 'SET_USER_FLIGHT_DATA';
export const setUserFlightData = payload => ({
    type: SET_USER_FLIGHT_DATA,
    payload,
});

export const SET_USER_DATA = 'SET_USER_DATA';
export const setUserData = payload => ({
    type: SET_USER_DATA,
    payload,
});

export const RESET_USER_DATA = 'RESET_USER_DATA';
export const resetUserData = () => ({
    type: RESET_USER_DATA,
});

export const syncFlightUserData = (isSignup = false) => async (dispatch, getState) => {
    const postLoginData = await getPostLoginUserData(getState(), isSignup);

    dispatch(resetUserFlightData());

    dispatch(setUserData(postLoginData.account));

    const data = {
        ...postLoginData,
        isAdvisor: !postLoginData.feedId,
    };

    delete data.account;

    dispatch(setUserFlightData(data));

    await dispatch(getAccountClients());
};

export const login = () => async (dispatch) => {
    const auth0Data = await showLogin();

    const { name, email, sub } = await getUserInfo(auth0Data.accessToken);

    const idToken = auth0Data.idToken;

    dispatch(setUserData({
        email,
        fullName: name,
        idToken,
    }));

    if (Platform.OS === 'ios') {
        bugsnag.setUser(getCurrentUser());
    } else if (Platform.OS === 'android') {
        bugsnag.setUser(getCurrentUser(), '', '');
    }

    const accountExists = await getUserAccountExists(sub);

    await dispatch(syncFlightUserData(!accountExists));

    const split = splitFullName(name);

    setUserProps({
        email,
        firstName: split.firstName,
        id: sub,
        isAdvisor: true,
        lastName: split.lastName,
    });

    trackLoggedIn();
};

export const logout = () => (dispatch) => {
    const lout = () => {
        goToLogin();

        dispatch(resetUserData());

        trackLoggedOut();
    };

    Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Logout',
            onPress: lout,
        },
    ],
    {
        cancelable: true,
    },
    );
};
