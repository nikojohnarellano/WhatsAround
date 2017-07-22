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
        const { focusedMarker } = this.props;

        return (
            <Header style={ styles.header }>
                <Body style={ styles.body }>
                    <Title style={ styles.title }>{ "Moving sale! Everything must go" }</Title>
                    <Subtitle  style={ styles.subtitle }>{ focusedMarker.listing.location }</Subtitle>
                </Body>
            </Header>
        );
    }
}

const styles = {
    header: {
        backgroundColor: "skyblue",
    },

    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        color: "white"
    },

    body: {
        flex : 1,
        justifyContent: "center",
        alignItems: "center"
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
