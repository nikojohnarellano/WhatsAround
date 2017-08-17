import React from 'react';
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';
import WutzAroundHeader from "../../components/WutzAroundHeader";
import fetchPlaces from '../../utilities/autoCompletePlaces'
import ListingProducts from './components/ListingProducts'
import ListingFields from "./components/ListingFields";
import ApiHelper from '../../api/ApiHelper'
import geocodeLocation from '../../utilities/geocodeApi'


const {width, height} = Dimensions.get("window");


export default class AddListingScreen extends React.Component {
    state = {
        fields : {
            title : "",
            location: "",
            startDate: "",
            startTime: "",
            endTime: "",
            description: "",
        }
    };

    _addListing = async () => {
        let geocodeResult, response;

        if(this._validateFields()) {
            geocodeResult = await geocodeLocation(this.state.fields.location);

            response = await ApiHelper.post('listing', {
                seller      : 8,
                title       : this.state.fields.title,
                location    : this.state.fields.location,
                latitude    : geocodeResult.results[0].geometry.location.lat,
                longitude   : geocodeResult.results[0].geometry.location.lng,
                description : this.state.fields.description,
                startDate   : this.state.fields.startDate,
                startTime   : this.state.fields.startTime,
                endTime     : this.state.fields.endTime
            });


            if(response.status === 'success') {
                console.log("listing successfully posted");
                return
            }
        }
    };

    _validateFields = () => {
        // Two required fields
        if(this.state.fields.title.length === 0 || this.state.fields.location.length === 0) {
            Alert.alert(
                'Fields Required',
                'Title and Location fields are required.',
                [ { text: "OK" } ]
            );

            return false;
        }

        return true;
    };

    _setField = (type, field) => {
        this.state.fields[type] = field;
        this.setState(this.state);
    };

    render() {
        let setFieldFacade = {
            setField : this._setField.bind(this),
            fields   : this.state.fields
        };

        return (
            <Container>
                <WutzAroundHeader title="Add Listing"/>
                <Content
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={ styles.container }>
                    <ListingProducts/>
                    <ListingFields setFieldFacade={ setFieldFacade } />
                    <View style={ styles.postButtonContainer }>
                        <Button style={ styles.postButton } rounded success onPress={async () => { await this._addListing() }}>
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
    },

    recenterText: {
        fontSize: 20,
        fontFamily: "webly-sleek",
        color: "white"
    },

    postButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    postButton : {
        alignSelf : "center"
    }
};

