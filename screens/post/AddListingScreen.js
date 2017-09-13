import React from 'react';
import {AsyncStorage, Dimensions, View, Text, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation'
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import WhatsAroundHeader from "../../components/WhatsAroundHeader";
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
     * @private
     */
    _resetFields = () => {
        this.setState({
            products: [],
            fields : {
                title : "",
                location: "",
                startDate: "",
                startTime: "",
                endTime: "",
                description: "",
            },
        });
    };

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _addListing = async () => {
        let geocodeResult,
            response,
            listingToBePosted,
            userInfoString,
            userInfo;

        if(this._validateFields()) {
            userInfoString    = await AsyncStorage.getItem('UserInfo');
            userInfo          = JSON.parse(userInfoString);
            geocodeResult     = await geocodeLocation(this.state.fields.location);

            listingToBePosted = new FormData();
            listingToBePosted.append('seller', userInfo.id);
            listingToBePosted.append('title', this.state.fields.title);
            listingToBePosted.append('location', this.state.fields.location);
            listingToBePosted.append('latitude', geocodeResult.results[0].geometry.location.lat);
            listingToBePosted.append('longitude', geocodeResult.results[0].geometry.location.lng);
            listingToBePosted.append('description', this.state.fields.description);
            listingToBePosted.append('startDate', this.state.fields.startDate);
            listingToBePosted.append('startTime', this.state.fields.startTime);
            listingToBePosted.append('endTime', this.state.fields.endTime);
            listingToBePosted.append('thumbnail', JSON.stringify({
                type: `image/${ this.state.products[0].image.uri.slice(-3) }`,
                file: this.state.products[0].image.base64
            }));
            listingToBePosted.append('products', JSON.stringify(this.state.products.map((prod) => {
                console.log(prod)

                let hello = {
                    image      : {
                        type : `image/${ prod.image.uri }`,
                        file : prod.image.base64
                    },
                    name       : prod.name || "",
                    description: prod.description || "",
                    price      : prod.price !== "" ? parseFloat(prod.price) : 0,
                    sold       : false
                };

                console.log(hello);

                return hello;
            })));

            this.setState({ loading : true });
            response = await ApiHelper.post('api/listing', listingToBePosted);
            this.setState({ loading : false });

            console.log(response);

            if(response) {
                // Redirect to home screen and show listing
                setTimeout(() => {
                    Alert.alert(
                        'Success',
                        response.message,
                        [
                            {
                                text: "OK",
                                onPress : () => {
                                    this._resetFields();
                                    this.props.navigation.navigate('Home', { newListing : response.listing })
                                }
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
                <WhatsAroundHeader title="Add Listing"/>
                <Content
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={ styles.container }>
                    <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                    <ListingProducts setProductFacade={ setProductFacade }/>
                    <ListingFields   setFieldFacade={ setFieldFacade } />
                    <View style={ styles.postButtonContainer }>
                        <Button style={ styles.postButton } full success onPress={async () => { await this._addListing() }}>
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

