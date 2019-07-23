import {
    Dimensions,
    Platform,
    StatusBar,
} from 'react-native';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
export const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const isTablet = windowWidth > 600;
export const navBarHeight = 68;
