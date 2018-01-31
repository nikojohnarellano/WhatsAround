import React from 'react';
import {TouchableOpacity, Picker, Text, Keyboard} from 'react-native';
import {Container, Content, Form, Item, Input, Label, ActionSheet, Header, Button} from 'native-base';
import Colors from '../../../constants/Colors';
import {FontAwesome} from '@expo/vector-icons';
import {Location, Permissions} from 'expo';
import DatePicker from "react-native-datepicker";
import Autocomplete from 'react-native-autocomplete-input'
import fetchPlaces from '../../../utilities/autoCompletePlaces'


export default class ListingFields extends React.Component {
    state = {
        currentLocation : {},
        hideResults : false,
    };

    /**
     * 
     */
    _autoCompletePlaces = async (query, location) => {
        let result = await fetchPlaces(query, location),
            places;

        if (result.status === "OK") {
            places = result.predictions.map((place) => place.description);

            this.setState({places: places})
        }
    };

    /**
     * 
     */
    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status === 'granted') {
            let currentLocation = await Location.getCurrentPositionAsync({});

            this.setState({ currentLocation })
        }
    };

    /**
     * 
     */
    async componentWillMount() {
        await this._getLocationAsync()
    }

    /**
     * 
     */
    render() {
        const {places}           = this.state;
        const { setFieldFacade } = this.props;

        return (
            <Form style={{marginTop: 20}}>
                <Item style={ styles.field } regular>
                    <Input
                        placeholderTextColor="#c9c9c9"
                        value={ setFieldFacade.fields.title && setFieldFacade.fields.title }
                        placeholder="Title"
                        onChangeText={title =>  setFieldFacade.setField('title', title)}
                        onEndEditing={() => { 
                            setFieldFacade.setField('title', setFieldFacade.fields.title)
                        }}
                        onSubmitEditing={() => {
                            setFieldFacade.setField('title', setFieldFacade.fields.title)
                        }}/>
                </Item>
                { /* Added z-index for automplete places field */ }
                <Item style={ {...styles.field, ...{zIndex: 1}}} regular>
                    <Label style={ styles.fieldIcon }>
                        <FontAwesome
                            name="map-marker"
                            size={30}ic
                            color={Colors.tabIconSelected}
                        />
                    </Label>
                    <Autocomplete
                        autoCorrect={false}
                        data={ places }
                        onChangeText={location => {
                            this._autoCompletePlaces(location, this.state.currentLocation);
                            setFieldFacade.setField('location', location);
                            this.setState({hideResults : false})
                        }}
                        onBlur={() => { this.setState({hideResults : true}) }}
                        placeholder="Location"
                        value={ setFieldFacade.fields.location && setFieldFacade.fields.location }
                        hideResults={ this.state.hideResults }
                        containerStyle={ styles.locationAutocomplete }
                        inputContainerStyle={{borderWidth: 0}}
                        renderItem={(location) => (
                            <TouchableOpacity onPress={() => {
                                console.log("called")
                                console.log(location)
                                setFieldFacade.setField('location', location);
                                this.setState({ hideResults : true })
                            }}>
                                <Text style={styles.itemText}>
                                    { location }
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </Item>
                <Item style={ styles.field } regular>
                    <Label style={ styles.fieldIcon }>
                        <FontAwesome
                            name="calendar"
                            size={30}
                            color={Colors.tabIconSelected}
                        />
                    </Label>
                    <DatePicker
                        showIcon={false}
                        mode="date"
                        format="MMM Do YYYY"
                        style={{ flex : 1  }}
                        date={  setFieldFacade.fields.startDate && setFieldFacade.fields.startDate }
                        placeholder={"Start Date (Optional)"}
                        confirmBtnText={"Confirm"}
                        cancelBtnText={"Cancel"}
                        customStyles={{
                            placeholderText: {
                                fontSize: 17
                            },
                            dateInput: {
                                borderWidth: 0,
                                alignItems: "flex-start"
                            },
                            dateText: {
                                fontSize: 17,
                            }
                        }}
                        onDateChange={startDate => setFieldFacade.setField('startDate', startDate)}
                    />
                </Item>
                {
                    setFieldFacade.fields.startDate !== "" &&
                    <Item style={ styles.field } regular>
                        <Label style={ styles.fieldIcon }>
                            <FontAwesome
                                name="clock-o"
                                size={30}
                                color={Colors.tabIconSelected}
                            />
                        </Label>
                        <DatePicker
                            showIcon={false}
                            style={{ flex : 1 }}
                            date={  setFieldFacade.fields.startTime }
                            mode="time"
                            format="hh:mm a"
                            placeholder={"Start Time"}
                            confirmBtnText={"Confirm"}
                            cancelBtnText={"Cancel"}
                            customStyles={{
                                placeholderText: {
                                    fontSize: 17
                                },
                                dateInput: {
                                    borderWidth: 0,
                                    alignItems: "flex-start"
                                },
                                dateText: {
                                    fontSize: 17
                                }
                            }}
                            onDateChange={startTime => setFieldFacade.setField('startTime', startTime) }
                        />
                        <DatePicker
                            showIcon={false}
                            style={{flex: 1}}
                            date={setFieldFacade.fields.endTime }
                            format="hh:mm a"
                            mode="time"
                            placeholder={"End Time"}
                            confirmBtnText={"Confirm"}
                            cancelBtnText={"Cancel"}
                            customStyles={{
                                placeholderText: {
                                    fontSize: 17
                                },
                                dateInput: {
                                    borderWidth: 0,
                                    alignItems: "flex-start"
                                },
                                dateText: {
                                    fontSize: 17
                                }
                            }}
                            onDateChange={endTime => setFieldFacade.setField('endTime', endTime) }
                        />
                    </Item>
                }
                <Item style={ styles.field } regular>
                    <Input
                        placeholderTextColor="#c9c9c9"
                        multiline
                        style={{ height: 100, justifyContent: "flex-start" }}
                        value={ setFieldFacade.fields.description && setFieldFacade.fields.description }
                        placeholder="Description (Optional)"
                        onEndEditing={Keyboard.dismiss}
                        onChangeText={description => setFieldFacade.setField('description', description) }/>
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
        borderWidth: 0
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
        marginLeft : 5
    },

    fieldIcon: {
        margin: 10
    },

};

