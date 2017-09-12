import React from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { Container, Content, Header, Item, Input, Icon, Button, Text } from 'native-base';
import {  Row, Col } from 'react-native-easy-grid'

import ProductCard from "./components/ProductCard";

const { width }  = Dimensions.get("window");
import ApiHelper from '../../api/ApiHelper'
const imageWidth = width /2 ;

export default class SearchProductScreen extends React.Component {
    state = {
        searchQuery : "",
        products : []
    };

    searchProduct = async () => {
        let products = await ApiHelper.get(`api/products?query=${ this.state.searchQuery }`);

        console.log(products);
        this.setState({ products })
    };

    async componentWillMount() {
        let products = await ApiHelper.get('api/products');

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
                        <Input
                            autoCapitalize="none"
                            onChangeText={(searchQuery) => this.setState({ searchQuery })}
                            value={ this.state.searchQuery }
                            placeholder="Search Products" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button onPress={async () => await this.searchProduct() }
                            transparent>
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
                                    <ProductCard item={item}/>
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
