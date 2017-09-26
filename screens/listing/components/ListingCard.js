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
import moment from 'moment';

const {width} = Dimensions.get("window");
import WhatsAroundUrl from '../../../constants/WhatsAroundUrl';

export default class ListingCard extends React.Component {

    render() {
        const {listing} = this.props;

        return (
            <Card>
                <CardItem cardBody>
                    <Image
                        resizeMode="stretch"
                        source={{uri: WhatsAroundUrl.url + listing.thumbnail}}
                        style={{
                            height: 200,
                            width: width,
                            flex: 1
                        }}/>
                </CardItem>
                <CardItem footer>
                    <Body>
                        <Text style={{fontWeight: "bold", fontSize: 15}}>{ listing.title }</Text>
                        <Text style={ styles.infoStyles} note>{ listing.location}</Text>
                        {
                            listing.start_date &&
                            <Text style={ styles.infoStyles} note>{ moment(listing.start_date).format('MMMM Do YYYY') + ", " + listing.start_time + " - " + listing.end_time }</Text>
                        }
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 18,
        backgroundColor: '#fff',
    },

    infoStyles : {
        fontSize : 12
    }

};
/**
 * Created by nikoarellano on 2017-07-21.
 */
