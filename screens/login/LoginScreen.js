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

    /**
     *
     * @returns {Promise.<*>}
     * @private
     */
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

    /**
     *
     * @returns {Promise.<*>}
     * @private
     */
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

    /**
     *
     * @param method
     * @returns {Promise.<void>}
     * @private
     */
    _login = async (method) => {
        let result;

        this.setState({ loading : true });

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
            this.setState({ loading  : false });

            setTimeout(() => {
                Alert.alert(
                    'Log in Cancelled',
                    `You have cancelled ${ result.method } log-in.`,
                );
            }, 100);
        } else if (result.failed) {
            this.setState({ loading  : false });
            setTimeout(() => {
                Alert.alert(
                    'Log in Failed',
                    `Login failed with ${ result.method }.`,
                );
            }, 100);
        } else {
            // Register user in WhatsAround Back end if not yet registered
            let user = await this._registerUserIfNotExist(result);

            // Save the info in the AsyncStorage for future use.
            await AsyncStorage.setItem('UserInfo', JSON.stringify(user));

            this.setState({ loading  : false });

            if(this.props.navigation.state.params) {
                this.props.navigation.state.params.setUser(user);
            }

            this.props.navigation.setParams({ update : true });
            this.props.navigation.goBack();

        }
    };

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _registerUser = async () => {
        this.setState({ loading : true });

        let user = await this._checkIfUserExistsInDb(this.state);

        if(!_.isEmpty(user)) {

            this.setState({ loading : false });

            setTimeout(() => {
                Alert.alert(
                    'Registration Failed',
                    'A user with the same e-mail already exists.'
                );
            }, 100);

        } else {

            user = await ApiHelper.post('register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password || Math.random().toString(36).substring(7)
            });

            await AsyncStorage.setItem('UserInfo', JSON.stringify(user));

            this.setState({loading: false});

            this.props.navigation.state.params.setUser(user);
            this.props.navigation.goBack();
        }
    };

    /**
     * A method that registers user if it doesn't exist in WhatsAround server.
     * Mainly used by facebook and google login where we register their credentials to the server.
     */
    _registerUserIfNotExist = async (credentials) => {
        let user = await this._checkIfUserExistsInDb(credentials);

        if(_.isEmpty(user)) {

            user = await ApiHelper.post('register', {
                    name     : credentials.name,
                    email    : credentials.email,
                    password : credentials.password || Math.random().toString(36).substring(7)
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

    /**
     *
     */
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
                                <Input placeholder='Name'
                                       value={this.state.name}
                                       autoCapitalize="none"
                                       onChangeText={(name) => this.setState({ name })}
                                />
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
                            <Button
                                full
                                success
                                onPress={async () => {
                                    this.state.register
                                     ? await this._registerUser()
                                     : await this._login('whatsaround')
                                }}>
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
                                        this.setState({
                                            register : true,
                                            email    : "",
                                            password : "",
                                            name     : ""
                                        })
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