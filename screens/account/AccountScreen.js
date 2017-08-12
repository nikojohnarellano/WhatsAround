/**
 * Created by nikoarellano on 2017-08-07.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Container, Content, Header, Footer, List, ListItem, Left, Right, Body, Title, Subtitle} from 'native-base'
import WhatsAroundHeader from '../../components/WutzAroundHeader'
import {FontAwesome} from '@expo/vector-icons';

export default class AccountScreen extends Component {

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
                        flex: 1,
                        justifyContent: "flex-start"
                    }}>
                    <List style={{
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: "gray",
                        backgroundColor: "white",
                        marginTop: 30
                    }}>
                        <ListItem>
                            <Left style={{flex: 1}}>
                                <FontAwesome
                                    name="chevron-right"
                                    size={32}
                                />
                            </Left>
                            <Body style={{flex: 2}}>
                            <Text>My Listings</Text>
                            </Body>
                            <Right/>
                        </ListItem>
                        <ListItem>
                            <Left style={{flex: 1}}>
                                <FontAwesome
                                    name="chevron-right"
                                    size={32}
                                />
                            </Left>
                            <Body style={{flex: 2}}>
                            <Text>Past Listings</Text>
                            </Body>
                            <Right/>
                        </ListItem>
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
                    <TouchableOpacity style={{ justifyContent: "center" }}>
                        <Text style={{ color: "red", fontSize: 20 }}>Log-out</Text>
                    </TouchableOpacity>
                </Footer>
            </Container>
        )
    }

}