import React from 'react';
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';
import WutzAroundHeader from "../../components/WutzAroundHeader";
import fetchPlaces from '../../utilities/autoCompletePlaces'
import ListingProducts from './components/ListingProducts'
import ListingFields from "./components/ListingFields";


const {width, height} = Dimensions.get("window");


export default class AddListingScreen extends React.Component {
    render() {
        return (
            <Container>
                <WutzAroundHeader title="Add Listing"/>
                <Content
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={ styles.container }>
                    <ListingProducts/>
                    <ListingFields/>
                    <View style={ styles.postButtonContainer }>
                        <Button style={ styles.postButton } rounded success onPress={() => {}}>
                            <Text style={ styles.recenterText }>Post</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },

    recenterText: {
        fontSize: 20,
        fontFamily: "webly-sleek",
        color: "white"
    },

    postButtonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },

    postButton : {
        alignSelf : "center"
    }
};

