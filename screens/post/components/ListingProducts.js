/**
 * Created by nikoarellano on 2017-07-31.
 */
import React from 'react';
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import Colors from '../../../constants/Colors';
import {FontAwesome} from '@expo/vector-icons';
import {ImagePicker} from 'expo';
import AddProductModal from "../AddProductModal"

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class ListingProducts extends React.Component {
    state = {
        modalVisible: false,
        modalImage: null,
        places: []
    };

    _pickImage = async (index) => {
        let options = {
            aspect: [4, 3],
            base64 : true
        }, result = null;


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

        if (!result.cancelled) {
            Alert.alert(
                'Add Details',
                'Do you want to add name, price, description to this photo?',
                [
                    {
                        text: 'No', onPress: () => {
                            this.props.setProductFacade.addProduct({ image : result });
                        }
                    },
                    {
                        text: 'Yes', onPress: () => {
                            this.setState({
                                modalVisible: true,
                                modalImage: result
                            })
                        }
                    },
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
        this.setState({modalVisible: false})
    };


    render() {
        const {products} = this.props.setProductFacade;

        return (
        <View style={{ height : 180 }}>
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
                    products.map((product, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <TouchableOpacity
                                    style={ styles.removeButton }
                                    onPress={() => { this.props.setProductFacade.removeProduct(index) }}>
                                    <FontAwesome
                                        style={ styles.removeIcon }
                                        name="times-circle"
                                    />
                                </TouchableOpacity>
                                <Image
                                    source={ product.image }
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                {
                                    (product.name && product.price) &&
                                    <View style={styles.locationAutocomplete}>
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
            <AddProductModal  closeModal={this._closeModal.bind(this)}
                              modalVisible={this.state.modalVisible}
                              productImage={this.state.modalImage}
                              addProduct={this.props.setProductFacade.addProduct}/>
        </View>
    )

    }
}

const styles = {

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


    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },

    cardDescription: {
        fontSize: 12,
        color: "#444",
    },

    removeButton : {
        borderWidth:1,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center',
        width:20,
        height:20,
        backgroundColor:'#fff',
        borderRadius:200,
        position : "absolute",
        top : 0,
        right : 0,
        zIndex : 2,
    },

    removeIcon : {
        backgroundColor: "transparent",
        borderWidth : 1,
        borderRadius :64,
        color: "red",
        fontSize:20,
        textAlign: "center",
    }
};

