import { StyleSheet } from 'react-native';

import { bismarckGray, createShadow, navBarHeight, white } from '../../styles';

export default StyleSheet.create({
    container: {
        ...createShadow(),
        alignItems: 'center',
        backgroundColor: bismarckGray,
        flexDirection: 'row',
        height: navBarHeight,
        justifyContent: 'space-between',
        left: 0,
        paddingLeft: 24,
        paddingRight: 24,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    middleContent: {

    },
    rightContent: {

    },
    text: {
        color: white,
        fontSize: 20,
    },
    logoText: {
        fontSize: 26,
    },
});
