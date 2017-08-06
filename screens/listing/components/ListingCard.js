import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Thumbnail,
    Button,
    Icon,
    Left,
    Body,
    Right,
    Title,
    Subtitle
} from 'native-base';

const {width} = Dimensions.get("window");

export default class ListingCard extends React.Component {

    render() {
        const {listing} = this.props;

        return (
            <Card>
                <CardItem cardBody>
                    <Image
                        resizeMode="contain"
                        source={{uri: listing.primary_pic}}
                        style={{
                            height: 200,
                            width: width,
                            flex: 1
                        }}/>
                </CardItem>
                <CardItem footer>
                    <Body>
                    <Text style={{fontWeight: "bold", fontSize: 15}}>{ listing.title }</Text>
                    <Text note>{ listing.location}</Text>
                    </Body>
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
