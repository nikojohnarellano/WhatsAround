import React from 'react';
import { Dimensions, View, Image, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Right, Button, Body, Title} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import WutzAroundHeader from '../../components/WutzAroundHeader'

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class AddProductModal extends React.Component {
    state = {
        title : "",
        price : "",
        description : "",
    };

    _addProduct = () => {
        if(this._validate()) {
            this.props.addProduct({
                image       : this.props.productImage,
                name        : this.state.title,
                price       : this.state.price,
                description : this.state.description
            });

            this.props.closeModal()
        }
    };

    _validate = () => {
        if(this.state.title.length === 0 || this.state.price.length ===0) {
            Alert.alert(
                'Fields Required',
                'Item name and Price fields are required.',
                [ { text: "OK" } ]
            );

            return false;
        }

        return true;
    };

    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => { this.setState({ title: "", price: "", description: "" })}}>
                <Container>

                     <WutzAroundHeader
                        title="Add Product"
                        renderRight={
                            () => { return (<TouchableOpacity
                                onPress={() => { this.props.closeModal() }}>
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
                            style= { styles.productImage }
                            source={ this.props.productImage }
                        />
                        <Form >
                            <Item last style={ styles.productField }>
                                <Input placeholder="Item Name" onChangeText={ (text) => { this.setState({ title:text }) }}/>
                            </Item>
                            <Item last style={ styles.productField }>
                                <Input keyboardType="numeric"
                                       placeholder="Price"
                                       onChangeText={ (text) => { this.setState({ price: text }) }}
                                       onFocus={ (text) => { this.setState({ price: this.state.price.substr(1) })} }
                                       onBlur={  (text) => { this.setState({ price: this.state.price && "$" + this.state.price}) } }
                                />
                            </Item>
                            <Item last style={ styles.productField }>
                                <Input style={{ height: 100 }}
                                       onChangeText={(text) => this.setState({ description: text })}
                                       placeholder="Description (Optional)"
                                       multiline/>
                            </Item>
                        </Form>
                        <View style={ styles.postButtonContainer }>
                            <Button style={ styles.postButton } rounded success onPress={() => { this._addProduct() }}>
                                <Text style={ styles.recenterText }>Add</Text>
                            </Button>
                        </View>
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
