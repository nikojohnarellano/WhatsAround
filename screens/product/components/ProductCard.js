import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Title } from 'native-base';
import { Row, Col } from 'react-native-easy-grid'

const { width }  = Dimensions.get("window");
const imageWidth = width /2 ;

export default class ProductCard extends React.Component {

    render() {
        const { image } = this.props;

        return (
            <Card>
                <CardItem header>
                        <Title>iPhone 7 2017 Bought last year</Title>
                </CardItem>
                <CardItem cardBody>
                    <Image source={ image } style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem footer>
                    <Left/>
                    <Body>
                        <Title>$50</Title>
                    </Body>
                    <Right/>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
/**
 * Created by nikoarellano on 2017-07-21.
 */
/**
 * Created by nikoarellano on 2017-07-21.
 */
