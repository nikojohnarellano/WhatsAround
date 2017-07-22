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


export default class WutzAroundHeader extends React.Component {

    render() {
        const { title } = this.props;

        return (
            <Header style={ styles.homeScreenHeader }>
                <Body>
                <Title style={ styles.homeScreenHeaderText }> { title } </Title>
                </Body>
            </Header>
        );
    }
}

const styles = {
    homeScreenHeader : {
        backgroundColor : "skyblue",
    },

    homeScreenHeaderText : {
        fontFamily: "webly-sleek",
        fontSize : 30,
        color: "white"
    }
};
