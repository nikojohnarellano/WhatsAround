/**
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/home/HomeScreen';
import BrowseScreen from '../screens/listing/BrowseScreen';
import AddListingScreen from '../screens/post/AddListingScreen';
import SearchProductScreen from '../screens/product/SearchProductScreen'
import AccountScreen from '../screens/account/AccountScreen'
import ListingScreen from '../screens/listing/ListingScreen'

export default TabNavigator(
    {
        Home: {
            screen: ListingScreen
        },
        Browse: {
            screen: BrowseScreen
        },
        AddListing: {
            screen: AddListingScreen,
        },
        Search : {
            screen: SearchProductScreen
        },
        Profile: {
            screen: AccountScreen
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            // Set the tab bar icon
            tabBarIcon: ({focused}) => {
                const {routeName} = navigation.state;
                let iconName, screenName;
                switch (routeName) {
                    case 'Home':
                        iconName = 'map-marker';
                        break;
                    case 'Browse':
                        iconName = 'th-large';
                        break;
                    case 'AddListing':
                        iconName = 'plus-circle';
                        break;
                    case 'Search':
                        iconName = 'search';
                        break;
                    case 'Profile':
                        iconName = 'navicon';
                        break;

                }
                return (
                    <FontAwesome
                        name={iconName}
                        size={32}
                        color="white"
                    />
                );
            },
            tabBarLabel : ({focused}) => {
                const {routeName} = navigation.state;
                let screenName;
                switch (routeName) {
                    case 'Home':
                        return 'Near Me';
                    case 'Browse':
                        return 'Browse';
                    case 'AddListing':
                        return 'Post';
                    case 'Profile':
                        return 'Account';
                    case 'Search':
                        return 'Search';
                }
            },
            header: null,

        }),
        // Put tab bar on bottom of screen on both platforms
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        // Disable animation so that iOS/Android have same behaviors
        animationEnabled: false,
        // Don't show the labels
        tabBarOptions: {
            showLabel: true,
            style : {
                backgroundColor : "skyblue",
            },
            labelStyle : {
                color: "white"
            }
        },

    }
);
