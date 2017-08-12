import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';

import cacheAssetsAsync from './utilities/cacheAssetsAsync';

import listings from './screens/home/Listings.json'

export default class AppContainer extends React.Component {
    state = {
        appIsReady: false,
    };

    componentWillMount() {
        this._loadAssetsAsync();
    }

    async _loadAssetsAsync() {
        try {
            await cacheAssetsAsync({
                images: [require('./assets/images/expo-wordmark.png')],
                fonts: [
                    FontAwesome.font,
                    {'Roboto': require('native-base/Fonts/Roboto.ttf')},
                    {'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')},
                    {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
                    {'webly-sleek': require('./assets/fonts/weblysleekuisl.ttf')}
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
        if (this.state.appIsReady) {
            return (
                <View style={styles.container}>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                    {Platform.OS === 'android' &&
                    <View style={styles.statusBarUnderlay}/>}
                    <RootNavigation />
                </View>
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
