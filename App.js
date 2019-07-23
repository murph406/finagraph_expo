import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-native-material-ui';
import { persistStore } from 'redux-persist';

import DrawerLayout from './src/components/DrawerLayout/DrawerLayoutComponent';
import Routes from './src/components/Routes/RoutesComponent';
// import store from './src/store';
import { bismarckGray, darkGreen } from './src/styles';
import { Router } from 'react-native-router-flux';

const uiTheme = {
  palette: {
    primaryColor: darkGreen,
    accentColor: 'white',
  },
};

const persistedState = {
  storage: AsyncStorage,
  whitelist: [
    'user',
  ],
};

export const storePersisted = new Promise((resolve) => {
  persistStore(store, persistedState, resolve);
});

export default function App() {
  return (
    <SafeAreaView style={{ backgroundColor: bismarckGray, flex: 1 }}>
      {/* <Provider store={store}> */}
        <ThemeProvider uiTheme={uiTheme}>
          <DrawerLayout>
            <Routes />
          </DrawerLayout>
        </ThemeProvider>
      {/* </Provider> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
