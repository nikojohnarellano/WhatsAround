/**
 * Created by nikoarellano on 2017-07-17.
 */
import React from 'react';
import { Dimensions, View, Image, Text, Alert } from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';


const {width, height} = Dimensions.get("window");


export default class AddProductScreen extends React.Component {
    state = {
        title : "",
        price : ""
    }

    _validate = () => {
        if(this.state.title.length === 0 || this.state.price.length ===0) {
            Alert.alert(
                'Fields Required',
                'Item name and Price fields are required.',
                [ { text: "OK" } ]
            )
        }
    };

    render() {
        const { result } = this.props;

        return (
            <Container>
                <Header>
                </Header>
                <Content contentContainerStyle={{ flex : 1 }}>
                        <Image
                            style= { styles.productImage }
                            source={{ uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" }}
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
                                   onBlur={ (text) => { this.setState({price: this.state.price && "$" + this.state.price}) } }
                                   value={ this.state.price }
                                   />
                        </Item>
                        <Item rounded last style={ styles.productField }>
                            <Input style={{ height: 100 }} placeholder="Description (Optional)" multiline/>
                        </Item>
                    </Form>
                    <View style={ styles.buttonWrapper }>
                        <Button style={ styles.addButton } title="Add" onPress={() => { this._validate() }}>
                            <Text style={ styles.buttonText }>Add</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }

}

const styles = {
    productImage : {
        height: 200,
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


