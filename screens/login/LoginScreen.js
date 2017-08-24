/**
 * Created by nikoarellano on 2017-08-21.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Container, Content, Body, Left, Right, Title, Form, Input, Item, Button} from 'native-base'
import {SocialIcon} from 'react-native-elements'
import WhatsAroundHeader from '../../components/WhatsAroundHeader'

export default class LoginScreen extends Component {
    render() {
        return (
            <Container>
                <WhatsAroundHeader/>
                <Content contentContainerStyle={{
                        flex : 1,
                        justifyContent: 'space-between'
                    }}>
                    <View style={{
                            flex : 1,
                            margin : 7
                        }}>
                        <Item regular style={{ marginTop : 10 }}>
                            <Input placeholder='Username'/>
                        </Item>
                        <Item regular style={{ marginTop : 10 }}>
                            <Input placeholder='Password'/>
                        </Item>
                        <View style={{ marginTop : 10 }}>
                            <Button full success onPress={() => {}}>
                                <Text style={
                                    {...styles.textStyle,
                                        ...{fontSize: 18, fontFamily: 'webly-sleek', color:'white'}}}>
                                    Sign In
                                </Text>
                            </Button>
                        </View>
                        <View style={{ marginTop : 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'skyblue' }}> Create an Account </Text>
                            <Text style={{ color: 'skyblue' }}> Forgot Password </Text>
                        </View>
                    </View>
                    <View style={{ flex : 1 }}>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            fontFamily='webly-sleek'
                            style={{borderRadius: 0 }}
                            type='facebook'
                        />
                        <SocialIcon
                            title='Sign In With Google'
                            button
                            fontFamily='webly-sleek'
                            style={{borderRadius: 0 }}
                            type='google-plus-official'
                        />
                    </View>

                </Content>
            </Container>
        )
    }
}

const styles = {
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    textStyle: {
        fontFamily: "webly-sleek"
    }
};