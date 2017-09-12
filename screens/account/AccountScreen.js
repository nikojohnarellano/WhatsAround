/**
 * Created by nikoarellano on 2017-08-07.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import {SocialIcon} from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';
import {
    Container,
    Content,
    Header,
    Footer,
    Button,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Title,
    Subtitle
} from 'native-base'
import ApiHelper from '../../api/ApiHelper'
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
        listings: {
            active: [],
            past: []
        },
        collapse: {
            active: true,
            past: true
        },
        user: null
    };

    _setUser = async (user) => {
        let activeListings   = await ApiHelper.get(`api/user/${ user.id }/listing/active`),
            pastListings     = await ApiHelper.get(`api/user/${ user.id }/listing/inactive`);

        this.setState({
            user,
            listings : {
                active : activeListings,
                past   : pastListings
            }
        })
    };


    _logoutUser = async () => {
        await AsyncStorage.clear();

        this.setState({
            user : null,
            listings : {
                active : [],
                past   : []
            }
        })
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
        this.setState({loading: true});

        let user = await AsyncStorage.getItem('UserInfo');

        if (user) {
            await this._setUser(JSON.parse(user));
        }

        this.setState({loading: false})
    }

    render() {
        return (
            <Container>
                <WhatsAroundHeader/>
                {
                    (this.state.user !== null) &&
                    <Header style={{backgroundColor: "white"}}>
                        <Left style={{flex: 1}}>
                            <FontAwesome
                                name="user-circle"
                                size={40}
                            />
                        </Left>
                        <Body  style={{flex: 2, alignItems: "flex-start"}}>
                        <Title style={{color: "black", fontFamily: 'webly-sleek'}}>{ this.state.user.name }</Title>
                        <Subtitle
                            style={{color: "black", fontFamily: 'webly-sleek'}}>{ this.state.user.email }</Subtitle>
                        </Body>
                        <Right/>
                    </Header>
                }

                <Content
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'space-between'
                    }}>
                    {
                        this.state.user === null &&
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Title style={{...styles.textStyle, ...{fontSize: 22}}}>
                                Sign in to WhatsAround
                            </Title>
                            <View style={{marginTop: 15}}>
                                <Button full success onPress={() => {
                                    this.props.navigation.navigate('Login', {setUser: this._setUser.bind(this)})
                                }}>
                                    <Text style={
                                        {
                                            ...styles.textStyle,
                                            ...{fontSize: 18, fontFamily: 'webly-sleek', color: 'white'}
                                        }}>
                                        Sign In
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    }
                    {
                        (this.state.user !== null) &&
                            <List style={{
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                borderColor: "gray",
                                marginTop: 25,
                                backgroundColor: "white"
                            }}>
                                {
                                    this._renderListing({
                                        type     : 'active',
                                        heading  : 'Active Listings',
                                        listings : this.state.listings.active
                                    })
                                }
                                {
                                    this._renderListing({
                                        type     : 'past',
                                        heading  : 'Past Listings',
                                        listings : this.state.listings.past
                                    })
                                }
                            </List>
                    }
                    <List style={{
                        marginTop : 20,
                        marginBottom: 40,
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
                </Content>
                {
                    (this.state.user !== null) &&
                    <Footer style={{backgroundColor: "white"}}>
                        <TouchableOpacity onPress={async () => { await this._logoutUser() } }
                                style={{justifyContent: "center"}}>
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
    textStyle: {
        fontFamily: "webly-sleek"
    }
};