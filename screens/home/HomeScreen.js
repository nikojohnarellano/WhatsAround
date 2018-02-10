import React from 'react';
import {MapView} from 'expo';
import {
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import {
    Thumbnail,
    Container,
    Content,
    Header,
    Left,
    Right,
    Title,
    Subtitle,
    Button,
} from 'native-base';
import ApiHelper from '../../api/ApiHelper'
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions, AppLoading} from 'expo';

import MapHeader from './components/MapHeader';
import WhatsAroundMap from './components/WhatsAroundMap'
import ZoomedListing from './components/ZoomedListing'
import WhatsAroundHeader from '../../components/WhatsAroundHeader'
import { getListings } from '../../actions/index'

import { connect } from 'react-redux'

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = CARD_HEIGHT - 50;
const delta = { latitudeDelta: 0.01, longitudeDelta: 0.001,};
const zoomoutDelta = { latitudeDelta: 0.07, longitudeDelta: 0.05, };

class HomeScreen extends React.Component {
    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: zoomoutDelta.latitudeDelta,
            longitudeDelta: zoomoutDelta.longitudeDelta,
        },
        listings : [],
        showItems: false,
        focusedListing: null,
        mapIsReady : false
    };

    /**
     *
     * @param map
     * @private
     */
    _refMap = (map) => {
        this.map = map
    };

    /**
     *
     * @param listing
     * @private
     */
    _addListing = (listing) => {
        this.setState({
            listings : [...this.state.listings, listing]
        });
    };

    /**
     *
     * @param listing
     * @private
     */
    _focusListing = (listing) => {
        this.state.showItems = true;
        this.state.focusedListing = listing;

        this.setState(this.state);

        this._recenterCurrent({
            latitude : listing.latitude,
            longitude : listing.longitude,
            latitudeDelta : delta.latitudeDelta,
            longitudeDelta : delta.longitudeDelta
        });
    };

    /**
     *
     * @private
     */
    _closeListing = async () => {
        this.state.showItems = false;
        this.state.focusedListing = null;

        this._recenterCurrent({
            latitude : this.state.region.latitude,
            longitude : this.state.region.longitude,
            latitudeDelta : zoomoutDelta.latitudeDelta,
            longitudeDelta : zoomoutDelta.longitudeDelta
        });

        this.setState(this.state);
    };

    /**
     *
     * @param region
     * @private
     */
    _onRegionChange = (region) => {
        this.setState({ region });
    };

    /**
     *
     * @param region
     * @private
     */
    _recenterCurrent = (region) => {
        this.map.animateToRegion(region);
    };

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _loadListings = async () => {
        let listingResults = await ApiHelper.get('api/listing');
        this.setState({ listings : listingResults })
    };

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _setInitialRegions = async () => {
        let coords = await this._getCurrentLocationAsync();

        this.setState({
            region :  {
                latitude : coords.latitude,
                longitude : coords.longitude,
                latitudeDelta : zoomoutDelta.latitudeDelta,
                longitudeDelta : zoomoutDelta.longitudeDelta
            }
        })
    };

    /**
     *
     * @returns {Promise.<void>}
     */
    async componentWillMount() {
        await this.props.getListings()
        await this._setInitialRegions();

        this.setState({ mapIsReady : true })
    }

    /**
     *
     * @returns {Promise.<*>}
     * @private
     */
    _getCurrentLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION),
            options  = { enableHighAccuracy: true, timeInterval: 3000 };

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            });

            return null;
        }

        let location = await Location.getCurrentPositionAsync(options);

        return {
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        }
    };


    _renderPostIcon = () => {
        return (
            <FontAwesome
                name={"pencil-square-o"}
                size={27}
                color="white"
                onPress={() => this.props.navigation.navigate('Post')}
            />
        )
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        const {navigate} = this.props.navigation;

        let selectListingFacade = {
            refMap         : this._refMap.bind(this),
            focusedListing : this.state.focusedListing,
            showItems      : this.state.showItems,
            focusListing   : this._focusListing.bind(this),
            closeListing   : this._closeListing.bind(this),
            recenterCurrent: this._recenterCurrent.bind(this)
        };

        return (
            <Container style={styles.container}>
                {
                    this.state.showItems ?
                        <MapHeader selectListingFacade={selectListingFacade}
                                   focusedListing={ this.state.focusedListing }/> :
                        <WhatsAroundHeader title="WhatsAround" renderRight={this._renderPostIcon}/>
                }
                {
                    this.state.mapIsReady ?
                    (
                        <View style={{ flex: 1 }}>
                            <WhatsAroundMap
                                listings={this.props.listings}
                                region={this.state.region}
                                selectListingFacade={selectListingFacade}
                                onRegionChange={this._onRegionChange.bind(this)}
                            />
                            {
                                this.state.showItems &&
                                <ZoomedListing
                                    products={this.state.focusedListing.products}
                                    navigate={navigate}
                                    selectListingFacade={selectListingFacade}
                                />
                            }
                        </View>
                    ) :
                    <View style={{ flex : 1, justifyContent : "center", alignItems: "center" }}>
                        <ActivityIndicator/>
                    </View>
                }
            </Container>
        )
    }
}

const mapStateToProps = ({ listingReducer }) => {
    const { listings } = listingReducer
    return { listings }
}

const mapDispatchToProps = ({
    getListings
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = {
    container: {
        flex: 1
    },
    mapContainer: {
        flex: 1
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    locationAutocomplete: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },

    pin: {
        backgroundColor: "white",
        alignItems: "center",
            justifyContent: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "gray",
        width: 55
    },

    pinImage: {
        width: 50,
        height: 50
    },

    pinThumbnail : {
        position: "absolute",
        left: 7,
        top:2.5,
    },

    pinText: {
        fontSize: 10,
        textAlign: "center"
    },

    recenterText : {
        fontSize: 20,
        fontFamily : "webly-sleek",
        color: "white"
    },

    headerButtons : {
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        position:"absolute",
        bottom: height - 180,
    }
};