import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Container, Content, Header, Item, Input, Icon, Button} from 'native-base';
import ApiHelper from '../../api/ApiHelper'


import ListingCard from './components/ListingCard'
import WhatsAroundHeader from "../../components/WhatsAroundHeader";

const {width} = Dimensions.get("window");
const imageWidth = width / 2;

export default class BrowseScreen extends React.Component {

    state = {
        listings : []
    };

    _loadListings = async () => {
        let listingResults = await ApiHelper.get('listing');
        this.setState({ listings : listingResults })
    };

    async componentWillMount() {
        await this._loadListings()
    }

    render() {

        return (
            <Container>
                <WhatsAroundHeader title="Listings"/>
                <Content>
                    { this.state.listings.map((listing, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('Listing', { listing : listing})
                                }} key={index}>
                                <ListingCard listing={listing}/>
                            </TouchableOpacity>
                        );
                    }) }
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },

    homeScreenHeader: {
        backgroundColor: "skyblue",
    },

    homeScreenHeaderText: {
        fontFamily: "webly-sleek",
        fontSize: 30,
        color: "white"
    }
};
