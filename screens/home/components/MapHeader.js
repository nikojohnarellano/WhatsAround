import React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {
    Header,
    Left,
    Right,
    Body,
    Title,
    Subtitle,
    Button
} from 'native-base';


export default class MapHeader extends React.Component {

    render() {
        const { focusedListing } = this.props;

        return (
            <Header style={ styles.header }>
                <Body style={ styles.body }>
                    <Title style={ styles.title }>{ focusedListing.title }</Title>
                    <Subtitle  style={ styles.subtitle }>{ focusedListing.location }</Subtitle>
                </Body>
            </Header>
        );
    }
}

const styles = {
    header: {
        backgroundColor: "skyblue",
        height : 80
    },

    body: {
        flex : 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title : {
        fontSize: 25,
        fontWeight: "bold",
        color:"white",
        fontFamily : "webly-sleek",
    },

    subtitle : {
        fontSize: 12,
        fontFamily : "webly-sleek",
        color: "white"
    }
};
