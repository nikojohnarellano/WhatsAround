import React, { Component } from 'react';
import { Image, View, Dimensions } from 'react-native';
import ApiHelper from '../../api/ApiHelper'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title, Subtitle } from 'native-base';
import WhatsAroundHeader from "../../components/WhatsAroundHeader";
import moment from 'moment';
import WhatsAroundUrl from '../../constants/WhatsAroundUrl'

const { width } = Dimensions.get('window');


export default class ProductScreen extends Component {

    state = {
        productListing : {}
    };

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderBackButton = () => {
        return (
            <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                <Icon name='arrow-back' style={{color: "white"}}/>
            </Button>
        )
    };

    /**
     *
     * @returns {Promise.<void>}
     */
    async componentWillMount() {
        const { product } = this.props.navigation.state.params;

        let productListing = await ApiHelper.get(`api/listing/${ product.listing_id }`)

        console.log(productListing)

        this.setState({ productListing })
    }


    render() {
        const { product } = this.props.navigation.state.params;

        return (
            <Container>
                <WhatsAroundHeader renderLeft={ this._renderBackButton } />
                <Content>
                    <Card>
                        {
                            (product.name != null || product.name != "") &&
                            <CardItem>
                                <Body style={{ flex : 1}}>
                                    <Title style={{ color: "black", fontSize : 20 }}>{ product.name }</Title>
                                </Body>
                            </CardItem>
                        }
                        {
                            (product.price != null) &&
                            <CardItem>
                                <Body style={{ flex : 1}}>
                                    <Text style={{ color: 'green', fontSize: 18 }}>{"$" + Number(product.price).toFixed(2)}</Text>
                                </Body>
                            </CardItem>
                        }
                            <CardItem cardBody>
                                <Image source={{uri: WhatsAroundUrl.url + product.image }}
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
                            <Title style={{ color: "black", fontFamily:'webly-sleek' }}>{ this.state.productListing.location }</Title>
                            <Subtitle style={{ color: "black", fontFamily:'webly-sleek' }}>
                                {
                                    this.state.productListing.start_date
                                    && moment(this.state.productListing.start_date).format('MMMM Do YYYY')
                                }
                                {
                                    this.state.productListing.start_time && this.state.productListing.end_time &&
                                    + ", " + this.state.productListing.start_time + " - " + this.state.productListing.end_time
                                }
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
                                <Title style={{ color: "black", fontFamily:'webly-sleek' }}>{ this.state.productListing.owner && this.state.productListing.owner.name }</Title>
                                <Subtitle style={{ color: "black", fontFamily:'webly-sleek' }}>{ this.state.productListing.owner && this.state.productListing.owner.email}</Subtitle>
                                <Subtitle style={{ color: "black", fontFamily:'webly-sleek' }}>{ this.state.productListing.owner && this.state.productListing.owner.contact}</Subtitle>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        );
    }
}