/**
 * Created by nikoarellano on 2017-08-21.
 */
import React, {Component} from 'react'
import {View, Text, Alert, AsyncStorage, TouchableOpacity} from 'react-native'
import {Container, Content, Body, Left, Right, Title, Form, Input, Item, Button} from 'native-base'
import {SocialIcon} from 'react-native-elements'
import {Facebook, Google} from 'expo'
import ApiHelper from '../../api/ApiHelper'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import WhatsAroundHeader from '../../components/WhatsAroundHeader'
import _ from 'lodash'

export default class LoginScreen extends Component {

    state = {
        loading  : false,
        register : false,
        email    : "",
        password : "",
        name     : ""
    };

    /**
     *
     * @returns {Promise.<*>}
     * @private
     */
    _loginWithWhatsAround = async () => {
        try {
            let result = await ApiHelper.post('login', { email : this.state.email, password : this.state.password });

            if(result.status === 'success') {
                console.log(result)

                return {
                    id      : result.user.id,
                    email   : result.user.email,
                    name    : result.user.name
                }
            } else {
                return { failed : true, method: 'WhatsAround' }
            }

        } catch (error) {
            console.log(error)
        }
    };

    _loginWithFacebook = async () => {
        try{
            const { type, token } = await Facebook.logInWithReadPermissionsAsync('265626027286007',
            {
                permissions: ['public_profile', 'email'],
                behavior : 'web'
            });


            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);

                return {
                    id      : response.data.id,
                    email   : response.data.email,
                    name    : response.data.name
                };

            } else if (type === 'cancel') {
                return { cancelled: true, method : 'Facebook' }
            }
        }
        catch(error) {
            return { failed : true, method: 'Facebook' }
        }
    };

    _loginWithGoogle = async () => {

        try {
            const response = await Google.logInAsync({
                androidClientId: '968457997378-rves5qkl4svkr8cjco4bulotfmt3nhuv.apps.googleusercontent.com',
                iosClientId    : '968457997378-4gipg3ebv72hrtignkavgmac1481q3c7.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });


            if (response.type === 'success') {
                return {
                    id      : response.user.id,
                    email   : response.user.email,
                    name    : response.user.name
                };

            } else {
                return { cancelled : true, method: 'Google' }
            }
        } catch(e) {
            return { failed : true, method: 'Google' }
        }
    };

    _login = async (method) => {
        let result;

        this.setState({ loading : true });

        console.log('im here')

        switch(method) {
            case 'facebook':
                result = await this._loginWithFacebook();
                break;

            case 'google' :
                result = await this._loginWithGoogle();
                break;

            case 'whatsaround' :
                result = await this._loginWithWhatsAround();
                break;
            default:
                break;
        }


        // Exit the method when login method has been failed or cancelled
        if(result.cancelled) {
            Alert.alert(
                'Log in Cancelled',
                `You have cancelled ${ result.method } log-in.`,
            );
        } else if (result.failed) {
            Alert.alert(
                'Log in Failed',
                `Login failed with ${ result.method }.`,
            );

        } else {
            // Register user in WhatsAround Back end if not yet registered
            let user = await this._registerUserIfNotExist(result);

            // Save the info in the AsyncStorage for future use.
            await AsyncStorage.setItem('UserInfo', JSON.stringify(user));

            this.props.navigation.state.params.setUser(user);
            this.props.navigation.goBack();
        }


        this.setState({ loading : false });
    };

    /**
     *
     */
    _registerUserIfNotExist = async (credentials) => {
        let user = await this._checkIfUserExistsInDb(credentials);

        // TODO
        // Set the id as the password into WhatsAround server
        if(_.isEmpty(user)) {

            user = await ApiHelper.post('register', {
                    name     : credentials.name,
                    email    : credentials.email,
                    password : credentials.id
            });

        }

        return user;
    };

    /**
     *
     * @private
     */
     _checkIfUserExistsInDb = async (credentials) => {
        let user = await ApiHelper.get(`api/user?email=${ credentials.email }`);
        return user;
    };

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
                        <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>
                        {
                            this.state.register &&
                            <Item regular style={{ marginTop : 10 }}>
                                <Input placeholder='Name'/>
                            </Item>
                        }
                        <Item regular style={{ marginTop : 10 }}>
                            <Input placeholder='E-mail Address'
                                   value={this.state.email}
                                   autoCapitalize="none"
                                   onChangeText={(email) => this.setState({ email }) } />
                        </Item>
                        <Item regular style={{ marginTop : 10 }}>
                            <Input placeholder='Password'
                                   value={this.state.password}
                                   secureTextEntry
                                   onChangeText={(password) => this.setState({ password }) } />
                        </Item>
                        <View style={{ marginTop : 10 }}>
                            <Button full success onPress={() => { this.state.register ? {} : this._login('whatsaround') }}>
                                <Text style={
                                    {...styles.textStyle,
                                        ...{fontSize: 18, fontFamily: 'webly-sleek', color:'white'}}}>
                                    { this.state.register ? "Register" : "Sign In" }
                                </Text>
                            </Button>
                        </View>
                        <View style={{ marginTop : 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity>
                            {
                                !this.state.register ?
                                <Text
                                    onPress={() => {
                                        this.setState({register: true})
                                    }}
                                    style={{color: 'black', textDecorationLine: 'underline'}}>
                                    Create an Account
                                </Text> :
                                <Text
                                    onPress={() => {
                                        this.setState({register: false})
                                    }}
                                    style={{color: 'black', textDecorationLine: 'underline'}}>
                                    Sign In
                                </Text>
                            }
                            </TouchableOpacity>
                            {/*<Text style={{ color: 'black' }}> Forgot Password </Text>*/}
                        </View>
                    </View>
                    <View style={{ flex : 1 }}>
                        <SocialIcon
                            title='Sign In With Facebook'
                            button
                            fontFamily='webly-sleek'
                            style={{borderRadius: 0 }}
                            type='facebook'
                            onPress={async () => await this._login('facebook')}
                        />
                        <SocialIcon
                            title='Sign In With Google'
                            button
                            fontFamily='webly-sleek'
                            style={{borderRadius: 0 }}
                            type='google-plus-official'
                            onPress={async () => await this._login('google') }
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