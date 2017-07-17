import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class CardImageExample extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Text style={{ fontSize : 20 }}>Niko's Moving Sale</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ'}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
                            <Body>
                                <Text style={{ color: "black", fontSize : 18 }}>Slightly used shoes</Text>
                            </Body>
                            <Right>
                                <Text style={{ fontSize : 20 }}>$40</Text>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}