import React from 'react';
import { Text, StyleSheet } from 'react-native';

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
            <Header style={{ height:100, backgroundColor: "blue" }}>
                <Body style={{ justifyContent: "flex-start", alignItems:"flex-start" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{ "Moving sale! Everything must go" }</Text>
                    <Text  style={{ fontSize: 12 }}>{ focusedMarker.listing.location }</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <FontAwesome
                            name="close"
                            size={24}
                        />
                    </Button>
                </Right>
            </Header>
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
