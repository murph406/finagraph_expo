import { Platform } from 'react-native';
import { capitalize } from 'lodash';

import {
    black,
    regular,
    lighterGray,
    mediumGray,
} from './colors';
import { medium } from './fonts';

export const centerChildren = {
    alignItems: 'center',
    justifyContent: 'center',
};

export const fullscreen = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
};

export const createShadow = (props = {}) => {
    if (Platform.OS === 'ios') {
        const { elevation, ...rest } = props;

        return {
            shadowColor: 'black',
            shadowRadius: 1,
            shadowOpacity: 0.2,
            shadowOffset: {
                width: 1,
                height: 2,
            },
            ...rest,
        };
    } else if (Platform.OS === 'android') {
        return {
            elevation: props.elevation || (props.shadowOffset && props.shadowOffset.height ? Math.abs(props.shadowOffset.height) : 4),
        };
    }

    return undefined;
};

const border = (color = lighterGray, position = 'top', width = 1) => {
    const borderColor = `border${capitalize(position)}Color`;
    const borderWidth = `border${capitalize(position)}Width`;
    const style = {};

    style[borderColor] = color;
    style[borderWidth] = width;

    return style;
};

export const grayBorder = (position = 'top', width = 1) => border(undefined, position, width);

export const hugeText = {
    color: black,
    fontSize: 45,
    lineHeight: 45,
    fontFamily: medium,
};

export const largeText = {
    color: black,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: medium,
};

export const bigText = {
    color: black,
    fontFamily: regular,
    fontSize: 20,
    lineHeight: 30,
};

export const mediumBoldText = {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: medium,
};

export const smallGrayText = {
    fontSize: 13,
    lineHeight: 15,
    color: mediumGray,
};

export const secondaryText = {
    color: 'rgba(0, 0, 0, 0.54)',
};
