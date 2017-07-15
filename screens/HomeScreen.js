import React from 'react';
import {MapView} from 'expo';
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Animated
} from 'react-native';
import {Thumbnail} from 'native-base'
import  {Constants, Location, Permissions, AppLoading} from 'expo';
import TouchableItem from "react-navigation/lib-rn/views/TouchableItem";


const Images = [
    {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ"},
    {uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70"},
    {uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg"},
    {uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg"}
]

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Map"
    };

    state = {
        markers: [
            {
                coordinate: {
                    latitude: 45.524548,
                    longitude: -122.6749817,
                },
                title: "Moving sale everything must gone!",
                description: "This is the best place in Portland",
                location: "4268 Victoria Drive",
                image: Images[0],
                hide: false
            },
            {
                coordinate: {
                    latitude: 45.524698,
                    longitude: -122.6655507,
                },
                title: "Garage sale",
                description: "Garage sale",
                location: "21 Jump street",
                image: Images[1],
                hide : false
            },
            {
                coordinate: {
                    latitude: 45.5230786,
                    longitude: -122.6701034,
                },
                title: "Everything must gone!",
                description: "Everything must gone!",
                location: "9230 Hard Street",
                image: Images[2],
                hide : false
            },
            {
                coordinate: {
                    latitude: 78.2471400,
                    longitude: -80.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 45.2471400,
                    longitude: -57.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 66.2471400,
                    longitude: -85.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 110.2471400,
                    longitude: -112.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 30.2471400,
                    longitude: -89.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 77.2471400,
                    longitude: -112.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 66.2471400,
                    longitude: -99.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 33.2471400,
                    longitude: -123.435677,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 56.2471400,
                    longitude: -65.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 43.2471400,
                    longitude: -178.0649260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
            {
                coordinate: {
                    latitude: 49.2471630,
                    longitude: -123.06412260,
                },
                title: "Fourth Best Place",
                location: "345 Church Street",
                description: "This is the fourth best place in Portland",
                image: Images[3],
                hide : false
            },
        ],
        region: {
            latitude: 45.52220671242907,
            longitude: -122.6653281029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
        showItems: false,
    };

    componentWillMount() {
        this.index = 0;
    }

    componentDidMount() {
    }

    _focusListing(marker) {
        if(!this.state.showItems) {
            this.state.markers.forEach((m) => { m.hide = m === marker ? false : true })
        } else {
            this.state.markers.forEach((m) => { m.hide = false })
        }

        this.state.showItems = !this.state.showItems;
        this.setState(this.state)
    }

    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}>
                    {this.state.markers.map((marker, index) => {
                        return marker.hide ? null : (
                            <MapView.Marker onPress={() => { this._focusListing(marker) }}
                                            key={ index }
                                            coordinate={ marker.coordinate }>
                                <View style={ styles.pin }>
                                    <Image style={ styles.pinImage} source={ marker.image }/>
                                    <Text style={styles.pinText}>{marker.title} </Text>
                                </View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                { this.state.showItems &&
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}>
                    {this.state.markers.map((marker, index) => (

                        <TouchableHighlight
                            key={index}
                            underlayColor={ "white" }
                            onPress={() => {
                                navigation.navigate('Product')
                            }}>
                            <View style={styles.card}>
                                <Image
                                    source={marker.image}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}>
                                        {marker.description}
                                    </Text>
                                </View>
                            </View>

                        </TouchableHighlight>
                    ))}
                </Animated.ScrollView>
                }
            </View>
        );
    }

    _getLocationAsync = async () => {
        var options = {
            enableHighAccuracy: true,
            timeInterval: 3000
        }

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


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
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
    textContent: {
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
        width: 25,
        height: 25
    },

    pinText: {
        fontSize: 10,
        textAlign: "center"
    }
});