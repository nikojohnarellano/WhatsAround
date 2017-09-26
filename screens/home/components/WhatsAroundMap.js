import React from 'react';
import {MapView} from 'expo';
import {
    Image,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Animated,
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
    Body
} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';

import {Location, Permissions} from 'expo';
const {width, height} = Dimensions.get("window");

import WhatsAroundUrl from '../../../constants/WhatsAroundUrl';

const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class WhatsAroundMap extends React.Component {

    render() {
        const {
            selectListingFacade,
            listings,
            region
        } = this.props;

        return (
            <MapView
                ref={selectListingFacade.refMap}
                initialRegion={region}
                style={styles.mapContainer}
                >
                {
                    listings.map((listing, index) => {
                        return (
                            <MapView.Marker onPress={ async () => {
                                !selectListingFacade.focusedListing ?
                                    selectListingFacade.focusListing(listing) :
                                    await selectListingFacade.closeListing()
                            }}
                                            key={ index }
                                            coordinate={{
                                                latitude: listing.latitude,
                                                longitude: listing.longitude
                                            }}>
                                <View>
                                    <Image style={{
                                        width: selectListingFacade.focusedListing  === listing ? 70 : 50,
                                        height: selectListingFacade.focusedListing === listing ? 70 : 50,
                                    }}
                                           source={ require('../../../assets/icons/marker.png') }/>
                                    <Thumbnail
                                        small={ !(selectListingFacade.focusedListing === listing) }
                                        style={{
                                            position: "absolute",
                                            left: 7,
                                            top: selectListingFacade.focusedListing === listing ? 0.7 : 2.5,
                                        }}
                                        source={{uri: WhatsAroundUrl.url +  listing.thumbnail}}/>
                                </View>
                            </MapView.Marker>
                        );
                    })
                }
            </MapView>
        );
    }

    _getLocationAsync = async () => {
        let options = {
            enableHighAccuracy: true,
            timeInterval: 3000
        };

        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied'
            })
        }

        let location = await Location.getCurrentPositionAsync(options);

        this.setState({location})
    }

}


const styles = {
    container: {
        flex: 1,
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

    pinThumbnail: {
        position: "absolute",
        left: 7,
        top: 2.5,
    },

    pinText: {
        fontSize: 10,
        textAlign: "center"
    },

    recenterText: {
        fontSize: 20,
        fontFamily: "webly-sleek",
        color: "white"
    },

    headerButtons: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: height - 180,
    }
};