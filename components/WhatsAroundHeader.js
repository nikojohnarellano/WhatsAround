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

    /**
     * 
     */
    render() {
        const { title, renderRight, renderLeft } = this.props;

        return (
            <Header style={ styles.homeScreenHeader }>
               <Left style={ styles.leftStyle }>{ renderLeft && renderLeft() }</Left>
                <Body style={ styles.bodyStyle }>
                    <Title style={ styles.homeScreenHeaderText }> { title } </Title>
                </Body>
                <Right style={ styles.rightStyle }>{ renderRight && renderRight() }</Right>
            </Header>
        );
    }
}

const styles = {
    bodyStyle: {
        flex : 3,
    },

    leftStyle: {
        flex: 2,
    },

    rightStyle : {
        flex: 2
    },

    homeScreenHeader : {
        backgroundColor : "skyblue",
    },

    homeScreenHeaderText : {
        fontFamily: "webly-sleek",
        fontSize : 23,
        color: "white",
        lineHeight : 27
    }
};
