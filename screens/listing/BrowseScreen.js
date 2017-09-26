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

    /**
     *
     * @returns {Promise.<void>}
     * @private
     */
    _loadListings = async () => {
        let listingResults = await ApiHelper.get('api/listing');
        this.setState({ listings : listingResults })
    };

    /**
     *
     * @returns {Promise.<void>}
     */
    async componentWillMount() {
        await this._loadListings()
    }

    /**
     *
     * @param nextProps
     * @returns {Promise.<void>}
     */
    async componentWillReceiveProps(nextProps) {
        console.log('im getting here');
        // TODO
        if(nextProps.navigation.state.params.update) {
            await this._loadListings()
        }
    }

    /**
     *
     * @returns {XML}
     */
    render() {

        return (
            <Container>
                <WhatsAroundHeader title="Listings"/>
                <Content>
                    { this.state.listings.map((listing, index) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('Listing', { listing })
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
