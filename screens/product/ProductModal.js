/**
 * Created by nikoarellano on 2017-08-19.
 */
import React from 'react';
import { Dimensions, View, Image, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Right, Button, Body, Title} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import WhatsAroundHeader from '../../components/WhatsAroundHeader'

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class ProductModal extends React.Component {

    render() {
        const {
            focusedProduct,
            showModal,
            hideProductModal
        } = this.props.productModalFacade;

        const hasDetails = focusedProduct.name && focusedProduct.price;

        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={showModal}
                onRequestClose={() => {}}>
                <Container>
                    <WhatsAroundHeader
                        renderRight={
                            () => { return (
                            <TouchableOpacity
                                onPress={() => { hideProductModal() }}>
                                <FontAwesome
                                    name="close"
                                    size={25}
                                    color="white"
                                />
                            </TouchableOpacity>) }
                        }/>
                    <Content>
                        <Image
                            resizeMode="stretch"
                            style = {hasDetails ? styles.productImage : styles.productFullImage }
                            source={{ uri : focusedProduct.image }}
                        />
                        {
                            (focusedProduct.name && focusedProduct.price) &&
                            <Form>
                                <Item stackedLabel last style={ styles.productField }>
                                    <Label>Item Name</Label>
                                    <Input value={ focusedProduct.name }/>
                                </Item>
                                <Item stackedLabel last style={ styles.productField }>
                                    <Label>Price</Label>
                                    <Input style={{ color: 'green' }} value={ "$" + focusedProduct.price.toString() } />
                                </Item>
                                {
                                    focusedProduct.description &&
                                    <Item stackedLabel last style={ styles.productField }>
                                        <Label>Description</Label>
                                        <Input value={ focusedProduct.description } style={{height: 100}} multiline/>
                                    </Item>
                                }
                            </Form>
                        }
                    </Content>
                </Container>
            </Modal>
        );
    }
}

const styles = {
    productImage : {
        height: 250,
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },

    productFullImage : {
        height : 500,
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },

    productField : {
        marginTop: 20
    },

    recenterText: {
        fontSize: 20,
        fontFamily: "webly-sleek",
        color: "white"
    },

    postButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },

    postButton : {
        alignSelf : "center"
    }

};



{/*<View style={{*/}
{/*height : 200,*/}
{/*justifyContent: "center",*/}
{/*alignItems: "center",*/}
{/*backgroundColor: "black"*/}
{/*}}>*/}
{/*<FontAwesome*/}
{/*name="camera"*/}
{/*size={32}*/}
{/*color={ Colors.tabIconSelected }*/}
{/*/>*/}
{/*</View>*/}
