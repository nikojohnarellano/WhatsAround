import React from 'react';
import {TouchableOpacity, StyleSheet, Animated, Dimensions, View, Image, Text} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header} from 'native-base';
import Colors from '../../constants/Colors';
import {FontAwesome} from '@expo/vector-icons';
import {ImagePicker} from 'expo';
import WutzAroundHeader from "../../components/WutzAroundHeader";

const Images = [
    {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ"},
    {uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70"},
    {uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg"},
    {uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg"}
]

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class AddListingScreen extends React.Component {
    state = {
        productImages: [],
    };

    _pickImage = async (index) => {
        let options = {
            aspect: [4, 3],
        }, result = null;

        switch(index) {
            case 0:
                result = await ImagePicker.launchCameraAsync(options);
                break;
            case 1:
                result = await ImagePicker.launchImageLibraryAsync(options);
                break;
            default:
                return;
        }

        this.state.productImages.push(result);

        if (!result.cancelled) {
            this.setState(this.state);
        }
    };

    _cameraAction = () => {
        let config = {
            options: ["Take Photo", "Choose From Library", "Cancel"],
            cancelButtonIndex: 2
        };

        ActionSheet.show(config, index => { this._pickImage(index) });
    };

    render() {
        const { productImages } = this.state;

        return (
            <Container>
                <WutzAroundHeader title="Add Listing"/>
                <Content>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}>

                        <View style={styles.card} key={2}>
                            <TouchableOpacity
                                onPress={ () => this._cameraAction() }
                                style={ styles.emptyProduct }>
                                <FontAwesome
                                    name="camera"
                                    size={32}
                                    color={ Colors.tabIconSelected }
                                />
                            </TouchableOpacity>
                        </View>

                        {
                            productImages.map((image, index) => {
                                return (
                                    <View style={styles.card} key={index}>
                                        <Image
                                            source={ image }
                                            style={styles.cardImage}
                                            resizeMode="cover"
                                        />
                                        <View style={styles.textContent}>
                                            <Text numberOfLines={1} style={styles.cardtitle}>Hey</Text>
                                            <Text numberOfLines={1} style={styles.cardDescription}>
                                                Wowowee
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })
                        }

                    </Animated.ScrollView>
                    <Form>
                        <Item floatingLabel last>
                            <Label>Title</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel>
                            <Label>Location</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Description</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
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
        paddingRight: width - CARD_WIDTH,
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
    emptyProduct: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray"
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
});


