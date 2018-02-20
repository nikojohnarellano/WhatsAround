import React from 'react';
import {AsyncStorage, Dimensions, View, Text, Alert, Keyboard} from 'react-native';
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
import safeExecute from '../../utilities/safeExecute'
import { connect } from 'react-redux'
import { addListing } from '../../actions'

const {width, height} = Dimensions.get("window");


class AddListingScreen extends React.Component {

    /**
     *
     * @type {{}}
     */
    userInfoJson = {};

    /**
     *
     * @type {{products: Array, fields: {title: string, location: string, startDate: string, startTime: string, endTime: string, description: string}, loading: boolean}}
     */
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

    _addProducts = async (products) => {
        let productsResult = await Promise.all(products);

        this.setState({
            products: [...this.state.products, ...productsResult]
        });

        console.log(this.state.products)
    }

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

    _signInIfNoUser = async () => {
        // If no user is logged in
        // Show an alert with sign in and cancel option
        // If sign in
        // Redirect to sign in and return
    };


    /**
     *
     * @param nextProps
     */
    async componentWillReceiveProps(nextProps) {
        if(this.props.navigation.state.params !== nextProps.navigation.state.params) {
            await this._postListing()
        }
    }

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _postListing = async () => {
        let geocodeResult,
            response,
            listingToBePosted,
            userInfoString,
            userInfo;

        userInfoString = await AsyncStorage.getItem('UserInfo');

        if(this._validateFields()) {
            userInfo          = JSON.parse(userInfoString);
            geocodeResult     = await geocodeLocation(this.state.fields.location);

            if(userInfoString === null) {
                Alert.alert(
                    'Sign in Required',
                    'You need to sign in before you can post a listing.',
                    [
                        {
                            text: "Sign In",
                            onPress : () => this.props.navigation.navigate('Profile')
                        },
                        {
                            text: "Cancel"
                        }
                    ]
                );
    
                return;
            }

            let newListing = {
                seller      : userInfo.id,
                title       : this.state.fields.title,
                location    : this.state.fields.location,
                latitude    : geocodeResult.results[0].geometry.location.lat,
                longitude   : geocodeResult.results[0].geometry.location.lng,
                description : this.state.fields.description,
                startDate   : this.state.fields.startDate,
                startTime   : this.state.fields.startTime,
                endTime     : this.state.fields.endtime,
                products    : this.state.products
            }

            
            this.setState({ loading : true });
            await this.props.addListing(newListing)
            this.setState({ loading : false });
        
            if(this.props.addListingSuccess) {
                // Redirect to home screen and show listing
                setTimeout(() => {
                    Alert.alert(
                        'Success',
                        'Listing was successfully posted.',
                        [
                            {
                                text: "OK",
                                onPress : () => {
                                    this._resetFields();
                                    this.props.navigation.goBack()
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
     */
    _renderBackButton = () => {
        return (
            <FontAwesome
                name={"chevron-left"}
                size={27}
                color="white"
                onPress={() => this.props.navigation.goBack()}
            />
        )
    }    

    /**
     *
     * @returns {XML}
     */
    render() {
        // TODO Convert to REDUX
        let setFieldFacade = {
            setField : this._setField.bind(this),
            fields   : this.state.fields
        }, setProductFacade = {
            products   : this.state.products,
            addProduct : this._addProduct.bind(this),
            addProducts : this._addProducts.bind(this),
            removeProduct : this._removeProduct.bind(this)
        };

        return (
            <Container>
                <WhatsAroundHeader title="Add Listing" renderLeft={this._renderBackButton}/>
                <Content
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={ styles.container }>
                    <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                    <ListingProducts setProductFacade={ setProductFacade }/>
                    <ListingFields   setFieldFacade={ setFieldFacade } />
                    <View style={ styles.postButtonContainer }>
                        <Button style={ styles.postButton } full success onPress={() => safeExecute(async () => { await this._postListing() })}>
                            <Text style={ styles.recenterText }>Post</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ listingReducer }) => {
    const { addListingSuccess } = listingReducer

    return { addListingSuccess }
}

const mapDispatchToProps = ({ addListing })

export default connect(mapStateToProps, mapDispatchToProps)(AddListingScreen)

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

