import React from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { Container, Content, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {  Row, Col } from 'react-native-easy-grid'
import { ExpoLinksView } from '@expo/samples';

import ProductCard from "./components/ProductCard";

const { width }  = Dimensions.get("window");
import ApiHelper from '../../api/ApiHelper'
const imageWidth = width /2 ;

const Images = [
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" },{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" }
];

export default class SearchProductScreen extends React.Component {
    state = {
        products : []
    };

    async componentWillMount() {
        let products = await ApiHelper.get('products');

        this.setState({ products })
    }

    render() {
        const { navigation } = this.props;
        let chunkSize = 2,
            groups    = this.state.products.map((item, index) =>
            {
                return index%chunkSize === 0 ? this.state.products.slice(index,index+chunkSize) : null;
            })
            .filter(function(e)
            {
                return e;
            });

        return (
            <Container>
                <Header style={ styles.searchProductHeader } searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search Products" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    { groups.map((item, indexRow) => {
                        return (
                            <Row key={indexRow}>
                                { item.length > 1 ?
                                    item.map((i, indexCol) => {
                                        return (
                                            <Col key={indexCol}>
                                                <ProductCard navigation={navigation} item={i}/>
                                            </Col>
                                        );
                                    }) :
                                    <ProductCard item={i}/>
                                }
                            </Row>
                        )
                    }) }
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },

    searchProductHeader : {
        backgroundColor: "skyblue"
    }
}
