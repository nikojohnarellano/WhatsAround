/**
 * Created by nikoarellano on 2017-08-12.
 */

import React, {Component} from 'react'
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import {Row, Col} from 'react-native-easy-grid'
import Colors from '../../../constants/Colors';
import ProductCard from '../../product/components/ProductCard'
import {FontAwesome} from '@expo/vector-icons';
import {ImagePicker} from 'expo';

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const productImages = [
    {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ"},
    {uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70"},
    {uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg"},
    {uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg"}
];

export default class ListingProducts extends Component {

    render() {

        let chunkSize = 2;
        let groups = productImages.map((item, index) => {
            return index % chunkSize === 0 ? productImages.slice(index, index + chunkSize) : null;
        }).filter(function (e) {
            return e;
        });

        return (
            <View style={{ flex : 1}}>
                {
                    groups.map((item, indexRow) => {
                        return (
                            <Row key={indexRow}>
                                {item.map((i, indexCol) => {
                                    return (
                                        <Col key={indexCol}>
                                            <ProductCard image={i}/>
                                        </Col>
                                    );
                                })}
                            </Row>
                        )
                    })
                }
            </View>
        );
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

    removeButton: {
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderRadius: 200,
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
    },

    removeIcon: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderRadius: 64,
        color: "red",
        fontSize: 20,
        textAlign: "center",
    }
};