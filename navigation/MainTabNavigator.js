/**
 * @flow
 */

import React from 'react';
import {View, Text} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import AddListingScreen from '../screens/AddListingScreen';
import ProductScreen from '../screens/ProductScreen'

export default TabNavigator(
    {

        Home: {
            screen: HomeScreen,
        },
        Add: {
            screen: AddListingScreen,
        },
        Browse: {
            screen: BrowseScreen,
        },
        Profile: {
            screen: BrowseScreen,
        }
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
                        screenName = 'Near Me';
                        break;
                    case 'Browse':
                        iconName = 'navicon';
                        screenName = routeName;
                        break;
                    case 'Add':
                        iconName = 'edit';
                        screenName = 'Post';
                        break;
                    case 'Profile':
                        iconName = 'user';
                        screenName = routeName;
                        break;

                }
                return (
                    <FontAwesome
                        name={iconName}
                        size={32}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
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
                        return routeName;
                    case 'Add':
                        return 'Post';
                    case 'Profile':
                        return routeName;
                }
            }
        }),
        // Put tab bar on bottom of screen on both platforms
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        // Disable animation so that iOS/Android have same behaviors
        animationEnabled: false,
        // Don't show the labels
        tabBarOptions: {
            showLabel: true,
        }
    }
);
