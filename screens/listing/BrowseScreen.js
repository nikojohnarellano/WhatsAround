import React from 'react';
import {Dimensions} from 'react-native';
import {Container, Content, Header, Item, Input, Icon, Button} from 'native-base';
import listings from '../home/Listings.json'


import ListingCard from './components/ListingCard'
import WutzAroundHeader from "../../components/WutzAroundHeader";

const {width} = Dimensions.get("window");
const imageWidth = width / 2;

export default class BrowseScreen extends React.Component {

    render() {

        return (
            <Container>
                <WutzAroundHeader title="Listings"/>
                <Content>
                    { listings.map((listing, index) => {
                        return <ListingCard key={ index } listing={listing}/>
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
