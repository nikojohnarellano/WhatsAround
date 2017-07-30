import React from 'react';
import { Dimensions, View, Image, Text, Alert, Modal, TouchableOpacity } from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Right, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';

const Images = [
    {uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ"},
    {uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70"},
    {uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg"},
    {uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg"}
]

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class AddProductModal extends React.Component {
    state = {
        title : "",
        price : ""
    };

    _addProduct = () => {
        if(this._validate()) {
            this.props.addProductDetails({
                name  : this.state.title,
                price : this.state.price,
            })

            this.props.closeModal()
        }
    };

    _validate = () => {
        if(this.state.title.length === 0 || this.state.price.length ===0) {
            Alert.alert(
                'Fields Required',
                'Item name and Price fields are required.',
                [ { text: "OK" } ]
            )

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
                onRequestClose={() => {alert("Modal has been closed.")}}>
                <Container>
                    <Header>
                        <Right>
                            <TouchableOpacity
                                    onPress={() => { this.props.closeModal() }}>
                                <FontAwesome
                                    name="close"
                                    size={25}
                                    color="skyblue"
                                />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content contentContainerStyle={{ flex : 1 }}>
                        <Image
                            resizeMode="stretch"
                            style= { styles.productImage }
                            source={ this.props.productImage }
                        />
                        <Form >
                            <Item rounded last style={ styles.productField }>
                                <Input placeholder="Item Name" onChangeText={ (text) => { this.setState({ title:text }) }}/>
                            </Item>
                            <Item rounded last style={ styles.productField }>
                                <Input keyboardType="numeric"
                                       placeholder="Price"
                                       onChangeText={ (text) => { this.setState({ price: text }) }}
                                       onFocus={ (text) => { this.setState({ price: this.state.price.substr(1) })} }
                                       onBlur={ (text) => { this.setState( { price: this.state.price && "$" + this.state.price}) } }
                                       value={ this.state.price }
                                />
                            </Item>
                            <Item rounded last style={ styles.productField }>
                                <Input style={{ height: 100 }} placeholder="Description (Optional)" multiline/>
                            </Item>
                        </Form>
                        <View style={ styles.buttonWrapper }>
                            <Button style={ styles.addButton } title="Add" onPress={() => { this._addProduct() }}>
                                <Text style={ styles.buttonText }>Add</Text>
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

    buttonWrapper : {
        flex: 1,
        flexDirection: "row",
        justifyContent:"center",
    },

    addButton : {
        width: 100,
        marginTop : 20,
        justifyContent: "center"
    },

    buttonText : {
        color: "white"
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