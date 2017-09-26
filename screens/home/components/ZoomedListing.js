/**
 * Created by nikoarellano on 2017-08-05.
 */
import React from 'react';
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
import {Avatar} from 'react-native-elements'
import {FontAwesome} from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 4.5;
const CARD_WIDTH = CARD_HEIGHT - 50;


import WhatsAroundUrl from '../../../constants/WhatsAroundUrl';

const delta = {latitudeDelta: 0.01, longitudeDelta: 0.001,};

export default class ZoomedListing extends React.Component {

    render() {
        const {selectListingFacade, navigate, products} = this.props;

        console.log(products);

        return (
            <View>
                <View style={ styles.headerButtons }>
                    <Button rounded success
                            onPress={() => {
                                selectListingFacade.recenterCurrent(
                                    {
                                        latitude: selectListingFacade.focusedListing.latitude,
                                        longitude: selectListingFacade.focusedListing.longitude,
                                        latitudeDelta: delta.latitudeDelta,
                                        longitudeDelta: delta.longitudeDelta
                                    }
                                )
                            }}>
                        <Text style={ styles.recenterText }>Re-center</Text>
                    </Button>

                    <Avatar medium
                            rounded
                            overlayContainerStyle={{ backgroundColor: "red" }}
                            icon={{ name: "arrow-right", type:"font-awesome" }}
                            onPress={() => {
                                navigate("ListingDetails", { listing : selectListingFacade.focusedListing })
                            }}/>
                </View>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}>
                    {
                        /* TODO remove and change with products*/
                        products.map((product, index) => (
                                <TouchableHighlight
                                    key={index}
                                    underlayColor={ "white" }
                                    onPress={() => {
                                        navigate('ProductDetails', { product })
                                    }}>
                                    <View style={styles.card}>
                                        <Image
                                            source={{uri: WhatsAroundUrl.url + product.image}}
                                            style={styles.cardImage}
                                            resizeMode="cover"
                                        />
                                        {
                                            (product.name !== "" && product.price !== null) &&
                                            <View style={styles.locationAutocomplete}>
                                                <Text numberOfLines={1}
                                                      style={styles.cardtitle}>{product.name}</Text>
                                                <Text numberOfLines={1}
                                                      style={styles.cardDescription}>{"$" + Number(product.price).toFixed(2)}</Text>
                                            </View>
                                        }
                                    </View>
                                </TouchableHighlight>
                            )
                        )
                    }
                </Animated.ScrollView>
            </View>
        )
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