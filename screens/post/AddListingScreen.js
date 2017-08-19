import React from 'react';
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import WutzAroundHeader from "../../components/WutzAroundHeader";
import fetchPlaces from '../../utilities/autoCompletePlaces'
import ListingProducts from './components/ListingProducts'
import ListingFields from "./components/ListingFields";
import ApiHelper from '../../api/ApiHelper'
import geocodeLocation from '../../utilities/geocodeApi'


const {width, height} = Dimensions.get("window");


export default class AddListingScreen extends React.Component {
    state = {
        products: [],
        fields : {
            title : "",
            location: "",
            startDate: "",
            startTime: "",
            endTime: "",
            description: "",
        },
        loading : false,
    };

    /**
     *
     * @param product
     * @private
     */
    _addProduct = (product) => {
        this.setState({
            products : [...this.state.products, product]
        });
    };

    /**
     *
     * @param index
     * @private
     */
    _removeProduct = (index) => {
        let array = this.state.products;
        array.splice(index, 1);
        this.setState({ products : array });
    };

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _addListing = async () => {
        let geocodeResult, response, listingToBePosted;

        if(this._validateFields()) {
            geocodeResult = await geocodeLocation(this.state.fields.location);

            listingToBePosted = {
                seller      : 8,
                title       : this.state.fields.title,
                location    : this.state.fields.location,
                latitude    : geocodeResult.results[0].geometry.location.lat,
                longitude   : geocodeResult.results[0].geometry.location.lng,
                description : this.state.fields.description,
                startDate   : this.state.fields.startDate,
                startTime   : this.state.fields.startTime,
                endTime     : this.state.fields.endTime,
                thumbnail   : this.state.products[0].image.uri,
                products    : this.state.products.map((prod) => {
                    return {
                        image      : prod.image.uri,
                        title      : prod.title || "",
                        description: prod.description || "",
                        price      : prod.price !== "" ? parseFloat(prod.price) : 0,
                        sold       : false
                    }
                })
            };

            this.setState({ loading : true });
            response = await ApiHelper.post('listing', listingToBePosted);
            this.setState({ loading : false });

            if(response) {
                // Redirect to home screen and show listing
                setTimeout(() => {
                    Alert.alert(
                        'Success',
                        response.message,
                        [
                            {
                                text: "OK",
                                onPress : () => {this.props.navigation.navigate('Home', { focusedListing : listingToBePosted })}
                            }
                        ]
                    )
                }, 100)
            } else {
                // Stay on the screen
                setTimeout(() => {
                    Alert.alert(
                        'Error',
                        'An error occurred while posting your listing.',
                        [ { text: "OK" }    ]
                    )
                }, 100)
            }
        }
    };

    /**
     *
     * @returns {boolean}
     * @private
     */
    _validateFields = () => {
        // Two required fields
        if(
            this.state.fields.title.length    === 0 ||
            this.state.fields.location.length === 0 ||
            this.state.products.length < 1
        ) {
            Alert.alert(
                'Fields Required',
                'Title and Location fields are required. At least one image should be included.',
                [ { text: "OK" } ]
            );

            return false;
        }

        return true;
    };

    /**
     *
     * @param type
     * @param field
     * @private
     */
    _setField = (type, field) => {
        this.state.fields[type] = field;
        this.setState(this.state);
    };

    /**
     *
     * @returns {XML}
     */
    render() {

        let setFieldFacade = {
            setField : this._setField.bind(this),
            fields   : this.state.fields
        }, setProductFacade = {
            products   : this.state.products,
            addProduct : this._addProduct.bind(this),
            removeProduct : this._removeProduct.bind(this)
        };

        return (
            <Container>
                <WutzAroundHeader title="Add Listing"/>
                <Content
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={ styles.container }>
                    <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                    <ListingProducts setProductFacade={ setProductFacade }/>
                    <ListingFields   setFieldFacade={ setFieldFacade } />
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

