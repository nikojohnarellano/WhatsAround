import React from 'react';
import {MapView} from 'expo';
import {
    Image,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Animated
} from 'react-native';
import {
    Thumbnail,
    Container,
    Content,
    Header,
    Left,
    Right,
    Body,
    Title,
    Subtitle,
    Button
} from 'native-base';
import MapHeader from './MapHeader';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';

import _ from 'lodash';

const Images = [
    {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ"},
    {uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70"},
    {uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg"},
    {uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg"}
]

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = CARD_HEIGHT - 50;

const listings = [
    {
        "id": 1,
        "seller_id": 1,
        "location": "1328 Meta Falls Nikolausside, KY 86428-7621",
        "latitude": 49.247140,
        "longitude": -123.064926,
        "title": "voluptatem",
        "description": "Ea dolores cupiditate labore culpa aut ullam optio rerum consequatur non est magni.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 2,
        "seller_id": 2,
        "location": "9295 Mann Ramp Port Kennedifurt, NH 49919",
        "latitude": 23.432544,
        "longitude": -37.148282,
        "title": "consequatur",
        "description": "Expedita laboriosam aliquid mollitia ducimus sit non iste explicabo.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 3,
        "seller_id": 3,
        "location": "8021 Bartoletti Villages Apt. 306 McLaughlinborough, OR 47872",
        "latitude": 71.759571,
        "longitude": 89.046086,
        "title": "cumque",
        "description": "Nihil quam autem temporibus molestiae itaque quibusdam.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 4,
        "seller_id": 4,
        "location": "9324 Dexter Ville Suite 877 Streichside, CA 87520-1128",
        "latitude": -84.290172,
        "longitude": 62.350638,
        "title": "delectus",
        "description": "Assumenda dolores id qui aut est possimus in tempore et eum est.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 5,
        "seller_id": 5,
        "location": "600 Buckridge Point Apt. 192 Maynardhaven, VT 02189",
        "latitude": -26.849363,
        "longitude": 132.325785,
        "title": "doloribus",
        "description": "Sequi nisi ut earum ullam optio voluptatem distinctio aut.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 6,
        "seller_id": 6,
        "location": "2291 Toy Walk West Bryana, UT 30948",
        "latitude": -76.788798,
        "longitude": 163.713886,
        "title": "deleniti",
        "description": "Ex sint sed ex est debitis beatae dolor minima quia quas veniam deleniti.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 7,
        "seller_id": 7,
        "location": "736 Ed Creek West Antwanfurt, CT 79273",
        "latitude": -38.232424,
        "longitude": -47.400086,
        "title": "deleniti",
        "description": "Incidunt voluptate adipisci sequi corrupti quibusdam est.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 8,
        "seller_id": 8,
        "location": "517 Monserrat Inlet Suite 378 South Adeline, MI 34841",
        "latitude": -31.695021,
        "longitude": -113.190602,
        "title": "porro",
        "description": "Dolorum repellat placeat voluptatem quia deleniti distinctio placeat delectus est explicabo aspernatur aut doloribus.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 9,
        "seller_id": 9,
        "location": "20953 Jonatan Pine East Adolfo, MD 85960-6954",
        "latitude": 61.043344,
        "longitude": 121.133038,
        "title": "totam",
        "description": "Similique aliquid consequuntur eius et aspernatur ducimus.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 10,
        "seller_id": 10,
        "location": "\"10130 surrey central\"",
        "latitude": 98.127388123,
        "longitude": 78.19282383,
        "title": "\"Hello world\"",
        "description": "\"description\"",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 05:59:14"
    },
    {
        "id": 11,
        "seller_id": 11,
        "location": "1669 Lynch Square Suite 235 East Guiseppe, IL 31719",
        "latitude": 81.252155,
        "longitude": 23.439288,
        "title": "exercitationem",
        "description": "Voluptas voluptatem quia dignissimos praesentium eum itaque vel nulla qui esse corporis.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 12,
        "seller_id": 12,
        "location": "3398 Ilene Key Hudsonside, IL 35265",
        "latitude": -32.388956,
        "longitude": 1.26235,
        "title": "quia",
        "description": "Non expedita voluptate eum voluptatem est fuga.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 13,
        "seller_id": 13,
        "location": "293 Farrell Cliff Suite 447 Erynfurt, WV 65572-6026",
        "latitude": 59.795555,
        "longitude": -12.898776,
        "title": "doloremque",
        "description": "Reprehenderit assumenda labore aliquid voluptatem fugiat animi et perferendis quo ullam velit dolorum quis.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    },
    {
        "id": 14,
        "seller_id": 14,
        "location": "6545 Lowe Knolls Apt. 565 North Kylatown, CA 55151",
        "latitude": 89.297075,
        "longitude": 125.080612,
        "title": "dicta",
        "description": "Dolor praesentium laudantium eum voluptatem cupiditate facere dicta.",
        "created_at": "2017-07-11 03:37:20",
        "updated_at": "2017-07-11 03:37:20"
    }
];

export default class HomeScreen extends React.Component {

    state = {
        markers: [
            {
                listing : listings[0],
                image: Images[0],
                hide: false
            },
            {
                listing : listings[1],
                image: Images[1],
                hide: false
            },
            {
                listing : listings[2],
                image: Images[2],
                hide: false
            },
            {
                listing : listings[3],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[4],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[5],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[6],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[7],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[8],
                image: Images[3],
                hide: false
            },
            {

                listing : listings[9],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[10],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[11],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[12],
                image: Images[3],
                hide: false
            },
            {
                listing : listings[13],
                image: Images[3],
                hide: false
            },
        ],
        region: {
            latitude: 49.247140,
            longitude: -123.064926,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
        showItems: false,
        focusedMarker: null
    };

    componentWillMount() {
        this.index = 0;
    }

    _focusListing(marker) {
        if (this.state.focusedMarker && this.state.focusedMarker === marker) {
            this.state.showItems     = false;
            this.state.focusedMarker = null;
        } else {
            this.state.showItems     = true;
            this.state.focusedMarker = marker;
        }

        this.state.region = {
            latitude: marker.listing.latitude,
            longitude: marker.listing.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.03,
        };

        this.setState(this.state);
        this.map.animateToRegion(this.state.region);
    }

    render() {
        const {navigation} = this.props;
        return (
            <Container style={styles.container}>
                {
                    this.state.showItems &&
                    <MapHeader focusedMarker={ this.state.focusedMarker } />
                }
                <View style={{flex: 1}}>
                    <Button style={{
                        position:"absolute",
                        top: 700,
                        left: 0,
                        right: 0,
                    }}>
                        <Text>Re-center</Text>
                    </Button>
                    <MapView
                        ref={map => this.map = map}
                        initialRegion={this.state.region}
                        style={styles.container}>
                        {this.state.markers.map((marker, index) => {
                            return marker.hide ? null : (
                                <MapView.Marker onPress={() => { this._focusListing(marker) }}
                                                key={ index }
                                                coordinate={{
                                                    latitude : marker.listing.latitude,
                                                    longitude : marker.listing.longitude
                                                }}>
                                    <View>
                                        <Image style={ styles.pinImage} source={ require('../../assets/icons/marker.png') }/>
                                            <Thumbnail small style={ styles.pinThumbnail }
                                                source={ marker.image } />
                                        <Text style={ styles.pinText }> {marker.title} </Text>
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
            </Container>
        );
    }

    _getLocationAsync = async () => {
        var options = {
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
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {},
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
        width: 50,
        height: 50
    },

    pinThumbnail : {
        position: "absolute",
        left: 7,
        top:2.5
    },

    pinText: {
        fontSize: 10,
        textAlign: "center"
    }
};