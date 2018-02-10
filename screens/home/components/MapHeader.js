import React from 'react';
import {Text, TouchableOpacity} from 'react-native'
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
        const { selectListingFacade } = this.props;

        return (
            <Header style={ styles.header }>
                <Left style={ styles.body }>
                    <Text style={ styles.title }>{ selectListingFacade.focusedListing.title }</Text>
                    <Text  style={ styles.subtitle }>{ selectListingFacade.focusedListing.location }</Text>
                </Left>
                <Right>
                    <TouchableOpacity
                        onPress={ async () => await selectListingFacade.closeListing() }
                        >
                        <FontAwesome
                            name="close"
                            size={32}
                            color="white"
                        />
                    </TouchableOpacity>
                </Right>
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
        flex : 3,
    },
    close : {
        flex : 1
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
