import React from 'react';
import {Platform, StatusBar, StyleSheet, View, AsyncStorage} from 'react-native';
import {AppLoading} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import listings from './screens/home/Listings.json'

export default class AppContainer extends React.Component {
    state = {
        appIsReady: false,
    };

    async componentWillMount() {
        await this._loadAssetsAsync();
    }

    async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                images: [require('./assets/images/expo-wordmark.png')],
                fonts: [
                    FontAwesome.font,
                    {'webly-sleek': require('./assets/fonts/weblysleekuisl.ttf')},
                    {'Roboto': require('native-base/Fonts/Roboto.ttf')},
                    {'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')},
                    {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
                ],
            });
        } catch (e) {
            console.warn(
                'There was an error caching assets (see: main.js), perhaps due to a ' +
                'network timeout, so we skipped caching. Reload the app to try again.'
            );
            console.log(e.message);
        } finally {
            this.setState({appIsReady: true});
        }
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

        if (this.state.appIsReady) {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}

                    <RootNavigation />
                    </View>
                </Provider>
                
            );
        } else {
            return <AppLoading />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});
