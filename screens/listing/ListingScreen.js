/**
 * Created by nikoarellano on 2017-07-21.
 */
import React, {Component} from 'react'
import { View, Image} from 'react-native'
import {Container, Content, Thumbnail, Left, Text, Right, Body, Title, Subtitle, List, ListItem, Header, Button, Icon, Card, CardItem} from 'native-base'
import WhatsAroundHeader from '../../components/WhatsAroundHeader'
import ProductModal from '../product/ProductModal'
import ListingProducts from './components/ListingProducts'
import WhatsAroundUrl from '../../constants/WhatsAroundUrl';
import moment from 'moment'

export default class ListingScreen extends Component {
    state = {
        focusedProduct : {},
        showModal : false,
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
     * @param focusedProduct
     * @private
     */
    _showProductModal = (focusedProduct) => {
        this.setState({ showModal : true, focusedProduct })
    };

    /**
     *
     * @private
     */
    _hideProductModal = () => {
        this.setState({ showModal : false })
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        const { listing } = this.props.navigation.state.params;

        let productModalFacade = {
            focusedProduct   : this.state.focusedProduct,
            showModal        : this.state.showModal,
            showProductModal : this._showProductModal.bind(this),
            hideProductModal : this._hideProductModal.bind(this)
        };
        return (
            <Container>
                <WhatsAroundHeader title={ listing.title } renderLeft={this._renderBackButton.bind(this)} />
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{uri: WhatsAroundUrl.url + listing.thumbnail }}
                                   style={{
                                       height: 200,
                                       width: null,
                                       flex: 1 }}/>
                        </CardItem>
                        <CardItem footer>
                            <Body style={{ flex : 1}}>
                                <Title style={ styles.headingTitle}>{ listing.title }</Title>
                                <Text note style={ styles.fieldContent }>{ listing.location }</Text>
                                    {
                                        listing.start_date &&
                                        <Text note style={ styles.fieldContent }>
                                            { moment(listing.start_date).format('MMMM Do YYYY') }
                                            {
                                                listing.start_time && listing.end_time &&
                                                ", " + listing.start_time + " - " + listing.end_time
                                            }
                                        </Text>
                                    }
                            </Body>
                        </CardItem>
                    </Card>
                    {
                        listing.description &&
                        <Card>
                            <CardItem>
                                <Body style={{ flex : 1}}>
                                <Text style={ styles.fieldContent }>{ listing.description }</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    }


                    <View style={{marginTop: 12}}>
                        <Text style={ {...styles.fieldTitle, ...{ marginLeft : 15} }}>On Sale:</Text>
                        <ListingProducts productModalFacade={productModalFacade} listing={ listing }/>
                    </View>
                </Content>
                <ProductModal productModalFacade={productModalFacade} />
            </Container>
        )
    }
}

const styles = {
    headingTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: "webly-sleek",
    },

    fieldTitle: {
        fontSize: 20,
        fontFamily: "webly-sleek"
    },

    fieldContent: {
        fontSize : 13,
        fontFamily: "webly-sleek"
    },


}