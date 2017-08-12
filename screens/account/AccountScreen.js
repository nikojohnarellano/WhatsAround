/**
 * Created by nikoarellano on 2017-08-07.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import {Container, Content, Header, Footer, List, ListItem, Left, Right, Body, Title, Subtitle} from 'native-base'
import WhatsAroundHeader from '../../components/WutzAroundHeader'
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
        }
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
                        <Text>{ section.heading }</Text>
                    </Body>
                    <Right/>
                </ListItem>
                <Collapsible collapsed={this.state.collapse[section.type]}>
                    {
                        section.listings.map((listing, index) => {
                            return (
                                <ListItem key={index}>
                                    <Body style={{flex: 1}}>
                                        <Text>{ listing.title }</Text>
                                    </Body>
                                </ListItem>
                            );
                        })
                    }
                </Collapsible>
            </View>
        )
    };

    render() {
        return (
            <Container>
                <WhatsAroundHeader/>
                <Header>
                    <Left style={{flex: 1}}>
                        <FontAwesome
                            name="user-circle"
                            size={40}
                        />
                    </Left>
                    <Body style={{flex: 2, alignItems: "flex-start"}}>
                    <Title>Niko Arellano</Title>
                    <Subtitle>nikootine123@gmail.com</Subtitle>
                    </Body>
                    <Right/>
                </Header>
                <Content
                    contentContainerStyle={{
                        justifyContent: "flex-start"
                    }}>
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
                    <List style={{
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: "gray",
                        marginTop: 25,
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
                            <Text>Settings</Text>
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
                            <Text>Feedback</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                    </List>
                </Content>
                <Footer >
                    <TouchableOpacity style={{justifyContent: "center"}}>
                        <Text style={{color: "red", fontSize: 20}}>Log-out</Text>
                    </TouchableOpacity>
                </Footer>
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
};