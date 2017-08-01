import React from 'react';
import {TouchableOpacity, Animated, Dimensions, View, Image, Text, Alert} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import Colors from '../../../constants/Colors';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';
import DatePicker from "react-native-datepicker";
import Autocomplete from 'react-native-autocomplete-input'
import fetchPlaces from '../../../utilities/autoCompletePlaces'


export default class ListingFields extends React.Component {
    state = {
        location: {}
    };

    _autoCompletePlaces = async (query, location) => {
        let result = await fetchPlaces(query, location),
            places;

        if (result.status === "OK") {
            places = result.predictions.map((place) => place.description);

            this.setState({places: places})
        }
    };


    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});

            this.setState({location: location})
        }
    };

    componentWillMount() {
        this._getLocationAsync()
    }

    render() {
        const {places} = this.state;

        return (
                    <Form style={{marginTop: 20}}>
                        <Item style={ styles.field } regular>
                            <Input placeholder="Title"/>
                        </Item>
                        { /* Added z-index for automplete places field */ }
                        <Item style={ {...styles.field, ...{ zIndex : 1 } }} regular>
                            <Label style={ styles.fieldIcon }>
                                <FontAwesome
                                    name="map-marker"
                                    size={30}
                                    color={Colors.tabIconSelected}
                                />
                            </Label>
                            <Autocomplete
                                autoCorrect={false}
                                data={ places }
                                onChangeText={text => {
                                    this._autoCompletePlaces(text, this.state.location)
                                }}
                                placeholder="Location"
                                containerStyle={ styles.locationAutocomplete }
                                inputContainerStyle={{ borderWidth : 0 }}
                                renderItem={(place) => (
                                    <TouchableOpacity onPress={() => {
                                    }}>
                                        <Text style={styles.itemText}>
                                            { place }
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </Item>
                        <Item style={ styles.field } regular>
                            <DatePicker
                                style={{width: 150}}
                                mode="date"
                                placeholder={"Start Date"}
                                format="YYYY-MM-DD"
                                confirmBtnText={"Confirm"}
                                cancelBtnText={"Cancel"}
                                customStyles={{
                                    placeHolderText: {
                                        color: "black",
                                        fontSize: 20
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 20
                                    }
                                }}
                                onDateChange={() => {
                                }}
                            />
                            <DatePicker
                                style={{width: 150}}
                                mode="date"
                                placeholder={"End Date"}
                                format="YYYY-MM-DD"
                                confirmBtnText={"Confirm"}
                                cancelBtnText={"Cancel"}
                                customStyles={{
                                    placeHolderText: {
                                        color: "black",
                                        fontSize: 20
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 20
                                    }
                                }}
                                onDateChange={() => {
                                }}
                            />
                        </Item>
                        <Item style={ styles.field } regular>
                            <Input placeholder="Description (Optional)"/>
                        </Item>
                    </Form>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },

    bottom: {
        flex: 1,
        alignItems: "center"
    },

    locationAutocomplete: {
        flex: 1,
        borderWidth:0
    },

    recenterText: {
        fontSize: 20,
        fontFamily: "webly-sleek",
        color: "white"
    },

    field: {
        borderWidth: 1,
        backgroundColor: "white",
        margin: 5,
        marginLeft: 8
    },

    fieldIcon: {
        margin: 10
    },

};

