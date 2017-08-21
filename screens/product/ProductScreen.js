import React, { Component } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title, Subtitle } from 'native-base';
import WhatsAroundHeader from "../../components/WhatsAroundHeader";
import moment from 'moment';

const { width } = Dimensions.get('window');


export default class ProductScreen extends Component {

    _renderBackButton = () => {
        return (
            <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                <Icon name='arrow-back' style={{color: "white"}}/>
            </Button>
        )
    };

    render() {
        const { product } = this.props.navigation.state.params;

        return (
            <Container>
                <WhatsAroundHeader renderLeft={ this._renderBackButton } />
                <Content>
                    <Card>
                        <CardItem>
                            <Body style={{ flex : 1}}>
                                <Title style={{ color: "black", fontSize : 20 }}>{ product.name }</Title>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body style={{ flex : 1}}>
                                <Text style={{ color: 'green', fontSize: 18 }}>{ "$" + product.price }</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: product.image }}
                                    style={{
                                        height: 200,
                                        width: null,
                                        flex: 1 }}/>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>{product.description}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <View style={{ marginTop: 20, marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: "webly-sleek" }}>Listing Info: </Text>
                    </View>
                    <Card>
                        <CardItem style={{ borderBottomWidth : 0.5, borderBottomColor : 'gray' }}>
                            <Body style={{ flex : 1}}>
                            <Title style={{ color: "black", fontFamily:'webly-sleek' }}>{ product.listing.location }</Title>
                            <Subtitle style={{ color: "black", fontFamily:'webly-sleek' }}>
                                { moment(product.listing.start_date).format('MMMM Do YYYY')
                                  + ", " + product.listing.start_time + " - " + product.listing.end_time }
                            </Subtitle>
                            </Body>
                        </CardItem>
                    </Card>

                    <View style={{ marginTop: 20, marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontFamily: "webly-sleek" }}>Seller: </Text>
                    </View>
                    <Card>
                        <CardItem style={{ borderBottomWidth : 0.5, borderBottomColor : 'gray' }}>
                            <Body style={{ flex : 1}}>
                                <Title style={{ color: "black", fontFamily:'webly-sleek' }}>{ product.listing.owner.name }</Title>
                                <Subtitle style={{ color: "black", fontFamily:'webly-sleek' }}>{ product.listing.owner.email}</Subtitle>
                                <Subtitle style={{ color: "black", fontFamily:'webly-sleek' }}>{ product.listing.owner.contact}</Subtitle>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        );
    }
}