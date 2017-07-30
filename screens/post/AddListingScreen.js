import React from 'react';
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import Colors from '../../constants/Colors';
import {FontAwesome} from '@expo/vector-icons';
import {ImagePicker} from 'expo';
import DatePicker from "react-native-datepicker";
import WutzAroundHeader from "../../components/WutzAroundHeader";
import AddProductModal from "./AddProductModal"


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
        modalVisible : false,
        modalImage : null

    };

    _pickImage = async (index) => {
        let options = {
            aspect: [4, 3],
        }, result = null;

        const { navigate } = this.props.navigation;

        switch (index) {
            case 0:
                result = await ImagePicker.launchCameraAsync(options);
                break;
            case 1:
                result = await ImagePicker.launchImageLibraryAsync(options);
                break;
            default:
                return;
        }

        if(!result.cancelled) {
            Alert.alert(
                'Add Details',
                'Do you want to add name, price, description to this photo?',
                [
                    {text: 'No', onPress: () => {
                        this.state.productImages.push({
                            image: result
                        });

                        this.setState(this.state)
                    }},
                    {text: 'Yes', onPress: () => {
                        this.setState({
                            modalVisible : true,
                            modalImage : result
                        })
                    }},
                ],
            )
        }

    };

    _cameraAction = () => {
        let config = {
            options: ["Take Photo", "Choose From Library", "Cancel"],
            cancelButtonIndex: 2
        };

        ActionSheet.show(config, index => {
            this._pickImage(index)
        });
    };

    _closeModal = () => {
        this.setState({ modalVisible : false })
    };

    _addProductDetails = (details) => {
        this.state.productImages.push({
            image : this.state.modalImage,
            name  : details.name,
            price : details.price,
        })
    };

    render() {
        const {productImages} = this.state;

        return (
            <Container>
                <WutzAroundHeader title="Add Listing"/>
                <Content contentContainerStyle={ styles.container }>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}
                        style={ styles.productsContainer }
                        contentContainerStyle={ styles.productsContentContainer }>

                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={ () => this._cameraAction() }
                                style={ styles.emptyProduct }>
                                <FontAwesome
                                    name="plus-circle"
                                    size={32}
                                    color={ Colors.tabIconSelected }
                                />
                            </TouchableOpacity>
                        </View>
                        {
                            productImages.map((product, index) => {
                                return (
                                    <View style={styles.card} key={index}>
                                        <Image
                                            source={ product.image }
                                            style={styles.cardImage}
                                            resizeMode="cover"
                                        />

                                        {
                                            (product.name && product.price) &&
                                            <View style={styles.textContent}>
                                                <Text numberOfLines={1} style={styles.cardtitle}>{ product.name }</Text>
                                                <Text numberOfLines={1} style={styles.cardDescription}>
                                                    { product.price }
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                );
                            })
                        }
                    </Animated.ScrollView>
                    <Form style={{ marginTop : 20 }}>
                        <Item style={ styles.field } regular>
                            <Input placeholder="Title"/>
                        </Item>
                        <Item style={ styles.field } regular>
                            <Label style={ styles.fieldIcon }>
                                <FontAwesome
                                    name="map-marker"
                                    size={30}
                                    color={Colors.tabIconSelected}
                                />
                            </Label>
                            <Input placeholder="Location"/>
                        </Item>
                        <Item style={ styles.field } regular>
                            <DatePicker
                                style={{width: 150}}
                                mode="date"
                                placeholder={"Start Date"}
                                format="YYYY-MM-DD"
                                confirmBtnText={"Confirm"}
                                cancelBtnText={"Cancel"}
                                customStyles={{
                                    placeHolderText : {
                                        color: "black",
                                        fontSize: 20
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 20
                                    }
                                }}
                                onDateChange={() => {}}
                            />
                            <DatePicker
                                style={{width: 150}}
                                mode="date"
                                placeholder={"End Date"}
                                format="YYYY-MM-DD"
                                confirmBtnText={"Confirm"}
                                cancelBtnText={"Cancel"}
                                customStyles={{
                                    placeHolderText : {
                                        color: "black",
                                        fontSize: 20
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 20
                                    }
                                }}
                                onDateChange={() => {}}
                            />
                        </Item>
                        <Item style={ styles.field } regular>
                            <Input placeholder="Description (Optional)"/>
                        </Item>
                    </Form>
                    <View style={{ flex: 1, justifyContent: "center", alignItems:"center" }}>
                        <Button rounded success onPress={() => {}}>
                            <Text style={ styles.recenterText }>Post</Text>
                        </Button>
                    </View>
                    <AddProductModal closeModal={ this._closeModal.bind(this) }
                                     modalVisible={this.state.modalVisible}
                                     productImage={this.state.modalImage}
                                     addProductDetails={this._addProductDetails.bind(this)} />
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex : 1,
    },
    bottom :{
        flex : 1,
        alignItems: "center"
    },
    productsContainer: {
        height: 70,
        backgroundColor: "gray"
    },
    productsContentContainer: {
        justifyContent: "center",
        alignItems: "center"
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

    recenterText: {
        fontSize: 20,
        fontFamily: "webly-sleek",
        color: "white"
    },

    field : {
        margin: 5,
        marginLeft : 8
    },

    fieldIcon : {
        margin: 10
    }
};

