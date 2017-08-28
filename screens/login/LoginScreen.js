/**
 * Created by nikoarellano on 2017-08-21.
 */
import React, {Component} from 'react'
import {View, Text, Alert, AsyncStorage} from 'react-native'
import {Container, Content, Body, Left, Right, Title, Form, Input, Item, Button} from 'native-base'
import {SocialIcon} from 'react-native-elements'
import {Facebook, Google} from 'expo'
import ApiHelper from '../../api/ApiHelper'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import WhatsAroundHeader from '../../components/WhatsAroundHeader'

export default class LoginScreen extends Component {

    state = {
        loading : false
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
                    token,
                    id      : response.data.id,
                    email   : response.data.email,
                    name    : response.data.name,
                    picture : response.data.picture.url
                };

            } else if (type === 'cancel') {
                return { cancelled: true, method : 'facebook' }
            }
        }
        catch(error) {
            return { failed : true, method: 'facebook' }
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
                    token   : response.accessToken,
                    id      : response.user.id,
                    email   : response.user.email,
                    name    : response.user.name,
                    picture : response.user.photoUrl
                };

            } else {
                return { cancelled : true, method: 'google' }
            }
        } catch(e) {
            return { failed : true, method: 'google' }
        }
    };

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

            default:
                break;
        }

        // Exit the method when login method has been failed or cancelled
        if(result.cancelled) {
            Alert.alert(
                'Log in Cancelled',
                `You have cancelled ${ result.method } log-in.`,
            );

            return;
        } else if (result.failed) {
            Alert.alert(
                'Log in Failed',
                `An error occurred when logging in with ${ result.method }.`,
            );

            return;
        }

        // Register user in WhatsAround Back end if not yet registered
        await this._registerUserIfNotExist(result);

        // Save the info in the AsyncStorage for future use.
        await AsyncStorage.setItem('UserInfo', JSON.stringify(result));

        this.setState({ loading : false });

        this.props.navigation.state.params.setUser(result);
        this.props.navigation.goBack();
    };

    /**
     *
     */
    _registerUserIfNotExist = async (user) => {
        let check = await this._checkIfUserExistsInDb(user)

        // Set the id as the password into WhatsAround server
        if(!check) {

            await ApiHelper.post('register', {
                name     : user.name,
                email    : user.email,
                password : user.id
            });

        }
    };

    /**
     *
     * @private
     */
     _checkIfUserExistsInDb = async (user) => {
        let result = await ApiHelper.get(`api/user?email=${ user.email }`);

        return (result !== null && result.email === user.email);
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