/**
 * Created by nikoarellano on 2017-08-07.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import { SocialIcon } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';
import {Container, Content, Header, Footer, Button, List, ListItem, Left, Right, Body, Title, Subtitle} from 'native-base'
import WhatsAroundHeader from '../../components/WhatsAroundHeader'
import {FontAwesome} from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";



const ACTIVE_LISTNG = {
    type: 'active',
    heading: 'Active Listing',
    listings: [{
        title: "Moving sale august 1!!",
        // TODO add other info
    }]
};

const PAST_LISTINGS = {
    type: 'past',
    heading: 'Past Listings',
    listings: [
        {
            title: "Garage sale december"
        },
        {
            title: "Yard sale march"
        },
        {
            title: "Moving sale april"
        },
        {
            title: "Whats up"
        },
        {
            title: "Hello"
        },
        {
            title: "WEEEE"
        }
    ]
}



export default class AccountScreen extends Component {

    state = {
        collapse: {
            active : true,
            past   : true
        },
        user : null
    };

    _renderListing = (section) => {
        return (
            <View>
                <ListItem button onPress={() => {
                    this.state.collapse[section.type] = !this.state.collapse[section.type];
                    this.setState(this.state)
                }}>
                    <Left style={{flex: 1}}>
                        <FontAwesome
                            name={ this.state.collapse[section.type] ? "chevron-right" : "chevron-down" }
                            size={32}
                        />
                    </Left>
                    <Body style={{flex: 2}}>
                        <Text style={ styles.textStyle }>{ section.heading }</Text>
                    </Body>
                    <Right/>
                </ListItem>
                <Collapsible collapsed={this.state.collapse[section.type]}>
                    {
                        section.listings.map((listing, index) => {
                            return (
                                <ListItem key={index}>
                                    <Body style={{flex: 1}}>
                                        <Text style={ styles.textStyle }>{ listing.title }</Text>
                                    </Body>
                                </ListItem>
                            );
                        })
                    }
                </Collapsible>
            </View>
        )
    };

    async componentWillMount() {
        let user = await AsyncStorage.getItem('whatsAroundUser');

        this.setState({ user });
    }

    render() {
        return (
            <Container>
                <WhatsAroundHeader/>
                {
                    (this.state.user !== null) &&
                    <Header style={{ backgroundColor: "white"}} >
                        <Left style={{flex: 1}}>
                            <FontAwesome
                                name="user-circle"
                                size={40}
                            />
                        </Left>
                        <Body style={{flex: 2, alignItems: "flex-start"}}>
                        <Title style={{ color: "black", fontFamily: 'webly-sleek' }}>{ user.name }</Title>
                        <Subtitle style={{ color: "black", fontFamily: 'webly-sleek' }}>{ user.email }</Subtitle>
                        </Body>
                        <Right/>
                    </Header>
                }

                <Content
                    contentContainerStyle={{
                        flex : 1,
                        justifyContent: "space-between"
                    }}>
                    {
                        (this.state.user !== null) &&
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex : 1}}>
                            <List style={{
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                borderColor: "gray",
                                marginTop: 25,
                                backgroundColor: "white"
                            }}>
                                { this._renderListing(ACTIVE_LISTNG) }
                                { this._renderListing(PAST_LISTINGS) }
                            </List>
                        </View>
                    }
                    {
                        this.state.user === null &&
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex : 1}}>
                            <Title style={{...styles.textStyle, ...{ fontSize: 22 }}} >
                                Sign in to WhatsAround
                            </Title>
                            <View style={{ marginTop : 15 }}>
                                <Button full success onPress={() => {
                                        this.props.navigation.navigate('Login')
                                    }}>
                                    <Text style={
                                        {...styles.textStyle,
                                        ...{fontSize: 18, fontFamily: 'webly-sleek', color:'white'}}}>
                                        Sign In
                                    </Text>
                                </Button>
                            </View>
                        </View>
                        /*
                        this.state.user === null &&
                        <View>
                            <Title style={{...styles.textStyle, ...{ fontSize: 22 }}} >
                                Sign in to WhatsAround
                            </Title>
                            <SocialIcon
                                title='Sign In With Facebook'
                                button
                                style={{ borderRadius : 0 }}
                                type='facebook'
                            />
                            <SocialIcon
                                title='Sign In With Google'
                                button
                                type='google-plus-official'
                            />
                        </View>*/
                    }
                    <View style={{ flex : 1, justifyContent: "center" }}>
                        <List style={{
                            borderTopWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderColor: "gray",
                            backgroundColor: "white"
                        }}>
                            <ListItem>
                                <Left style={{flex: 1}}>
                                    <FontAwesome
                                        name="cog"
                                        size={32}
                                    />
                                </Left>
                                <Body style={{flex: 2}}>
                                <Text style={ styles.textStyle }>Settings</Text>
                                </Body>
                                <Right/>
                            </ListItem>
                            <ListItem>
                                <Left style={{flex: 1}}>
                                    <FontAwesome
                                        name="exclamation-circle"
                                        size={32}
                                    />
                                </Left>
                                <Body style={{flex: 2}}>
                                <Text style={ styles.textStyle }>Feedback</Text>
                                </Body>
                                <Right/>
                            </ListItem>
                        </List>
                    </View>
                </Content>
                {
                    (this.state.user !== null) &&
                    <Footer style={{backgroundColor: "white"}}>
                        <TouchableOpacity style={{justifyContent: "center"}}>
                            <Text style={{color: "red", fontSize: 20, fontFamily: "webly-sleek"}}>Log-out</Text>
                        </TouchableOpacity>
                    </Footer>
                }
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
    textStyle : {
        fontFamily: "webly-sleek"
    }
};