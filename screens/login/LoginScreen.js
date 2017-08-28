/**
 * Created by nikoarellano on 2017-08-21.
 */
import React, {Component} from 'react'
import {View, Text, Alert, AsyncStorage} from 'react-native'
import {Container, Content, Body, Left, Right, Title, Form, Input, Item, Button} from 'native-base'
import {SocialIcon} from 'react-native-elements'
import {Facebook, Google} from 'expo'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import WhatsAroundHeader from '../../components/WhatsAroundHeader'

export default class LoginScreen extends Component {

    state = {
        loading : false
    };

    _loginWithFacebook = async () => {
        const { setUser } = this.props.navigation.state.params;
        const { goBack }  = this.props.navigation;

        try{
            const { type, token } = await Facebook.logInWithReadPermissionsAsync('265626027286007',
            {
                permissions: ['public_profile', 'email'],
                behavior : 'web'
            });


            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);

                let user = {
                    token,
                    id      : response.data.id,
                    email   : response.data.email,
                    name    : response.data.name,
                    picture : response.data.picture.url
                };

                this.setState({ loading : true });

                await AsyncStorage.setItem(
                    'UserInfo',
                    JSON.stringify(user)
                );

                this.setState({ loading : false });

                setUser(user);
                goBack();
            } else if (type === 'cancel') {
                Alert.alert(
                    'Log in Cancelled',
                    `You have cancelled Facebook log-in.`,
                );
            }
        }
        catch(error) {
            Alert.alert(
                'Log in Failed',
                `An error occurred when logging in with Facebook.`,
            );
        }
    };

    _loginWithGoogle = async () => {
        const { setUser } = this.props.navigation.state.params;
        const { goBack }  = this.props.navigation;

        try {
            const response = await Google.logInAsync({
                androidClientId: '968457997378-rves5qkl4svkr8cjco4bulotfmt3nhuv.apps.googleusercontent.com',
                iosClientId    : '968457997378-4gipg3ebv72hrtignkavgmac1481q3c7.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            let user = {
                token   : response.accessToken,
                id      : response.user.id,
                email   : response.user.email,
                name    : response.user.name,
                picture : response.user.photoUrl
            };

            if (response.type === 'success') {
                this.setState({ loading : true });

                await AsyncStorage.setItem(
                    'UserInfo',
                    JSON.stringify(user)
                );

                this.setState({ loading : false });

                setUser(user);
                goBack();
            } else {
                Alert.alert(
                    'Log in Cancelled',
                    `You have cancelled Google log-in.`,
                );
            }
        } catch(e) {
            Alert.alert(
                'Log in Failed',
                `An error occurred when logging in with Google.`,
            );
        }
    };

    render() {
        return (
            <Container>
                <WhatsAroundHeader/>
                <Content contentContainerStyle={{
                        flex : 1,
                        justifyContent: 'space-between'
                    }}>
                    <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
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
                            <Text style={{ color: 'black' }}> Create an Account </Text>
                            <Text style={{ color: 'black' }}> Forgot Password </Text>
                        </View>
                    </View>
                    <View style={{ flex : 1 }}>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            fontFamily='webly-sleek'
                            style={{borderRadius: 0 }}
                            type='facebook'
                            onPress={async () => await this._loginWithFacebook()}
                        />
                        <SocialIcon
                            title='Sign In With Google'
                            button
                            fontFamily='webly-sleek'
                            style={{borderRadius: 0 }}
                            type='google-plus-official'
                            onPress={async () => await this._loginWithGoogle() }
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