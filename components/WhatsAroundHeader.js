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


export default class WhatsAroundHeader extends React.Component {

    render() {
        const { title, renderRight, renderLeft } = this.props;

        return (
            <Header style={ styles.homeScreenHeader }>
                {
                    renderLeft ? (<Left style={ styles.leftStyle }>{ renderLeft() }</Left>) : <Left style={ styles.leftStyle }/>
                }
                <Body style={ styles.bodyStyle }>
                    <Title style={ styles.homeScreenHeaderText }> { title } </Title>
                </Body>
                {
                    renderRight ? (<Right style={ styles.rightStyle }>{ renderRight() }</Right>): <Right style={ styles.rightStyle }/>
                }
            </Header>
        );
    }
}

const styles = {
    bodyStyle: {
        flex : 3,
    },

    leftStyle: {
        flex: 1,
    },

    rightStyle : {
        flex: 1
    },

    homeScreenHeader : {
        backgroundColor : "skyblue",
    },

    homeScreenHeaderText : {
        fontFamily: "webly-sleek",
        fontSize : 23,
        color: "white"
    }
};
