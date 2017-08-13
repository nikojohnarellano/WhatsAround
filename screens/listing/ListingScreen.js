/**
 * Created by nikoarellano on 2017-07-21.
 */
import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Container, Content, Thumbnail, Left, Right, Body, Title, Subtitle, List, ListItem, Header} from 'native-base'
import WutzAroundHeader from '../../components/WutzAroundHeader'
import Listings from '../home/Listings.json'
import ListingProducts from './components/ListingProducts'


const listing = Listings[0];

export default class ListingScreen extends Component {
    render() {
        return (
            <Container>
                <WutzAroundHeader/>
                <Content>
                    {/* Render first picture */}

                    <View style={{
                        alignItems: "center",
                    }}>
                        <View style={{alignItems: "center",}}>
                            <Title style={ styles.headingTitle }>
                                Moving Sale oct 25
                            </Title>
                        </View>
                        <List style={{marginTop: 20, backgroundColor: "white",}}>
                            <ListItem first style={{flexDirection: "column", alignItems: "center"}}>
                                <Text style={ styles.fieldContent }>4268 Victoria Drive Vancouver BC</Text>
                            </ListItem><
                            ListItem style={{flexDirection: "column", alignItems: "center"}}>
                                <Text style={ styles.fieldContent }>Aug 7th, 2017 08:00 AM - 5:00 PM</Text>
                            </ListItem>
                            <ListItem style={{flexDirection: "column", alignItems: "center"}}>
                                <Text style={ styles.fieldContent }>On sale happening today! Moving to California
                                    tomorrow so need everything gone!</Text>
                            </ListItem>

                        </List>
                    </View>
                    <View style={{marginTop: 12}}>
                        <Text style={ {...styles.fieldTitle, ...{alignSelf: "center"}}}>Products:</Text>
                        <ListingProducts/>
                    </View>

                </Content>
            </Container>
        )
    }
}

const styles = {
    headingTitle: {
        fontSize: 30,
        fontFamily: "webly-sleek",
        textAlign: "center"
    },

    fieldTitle: {
        fontSize: 20,
        fontFamily: "webly-sleek"
    },

    fieldContent: {
        textAlign: "center",
        fontFamily: "webly-sleek"
    }
}