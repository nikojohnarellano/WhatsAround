import React, { Component } from 'react';
import { FlatList, View, Text, CameraRoll, Dimensions, StyleSheet, Modal, Button, Platform } from 'react-native';
import WhatsAroundHeader from '../../../components/WhatsAroundHeader'
import ImageTile from './ImageTile'
const { width } = Dimensions.get('window')

export default class ImagePicker extends Component {
    
    state = {
        photos : [],
        selected : {},
        after : null,
        hasNextPage : true,
    }

    /**
     * 
     */
    _getPhotos = async () => {
        let result = null, photoURIs = [], params = { first : 100 };

        if(!this.state.hasNextPage) {
            return;
        }

        if(this.state.after) {
            params.after = this.state.after;
        }

        try {
            result = await CameraRoll.getPhotos(params)
        } catch(e) {
            console.error(e)
        }

        if (this.state.after === result.page_info.end_cursor) { 
            return;
        }

        photoURIs = result.edges.map(i => ({ type : i.node.type, uri : i.node.image.uri }));

        this.setState({ 
            photos : [...this.state.photos, ...photoURIs],
            after  : result.page_info.end_cursor,
            hasNextPage : result.page_info.has_next_page
        })
    }

    /**
     * 
     */
    _getItemLayout = (data,index) => {
        let length = width/3;
        return { length, offset: length * index, index }
    }

    /**
     * 
     */
    _selectImage = (item) => {
        let selected = Object.assign({}, this.state.selected)

        if(selected[item.uri]) {
            delete selected[item.uri];
        } else {
            selected[item.uri] = item;
        }

        this.setState({ selected })
    }

    /**
     * 
     */
    _renderImageTile = ({ item, index }) => {
        let selected = this.state.selected[item.uri] ? true : false;

        return (
            <ImageTile 
                item={item}
                index={index}
                selected={selected}
                selectImage={this._selectImage.bind(this)}
                />
        )
    }

    /**
     * 
     */
    _renderHeader = () => {
        let selectedCount = this.state.photos.reduce((acc, i) => {return acc += i.selected ? 1 : 0}, 0);
        let headerText    = selectedCount + ' selected';
        let renderRight   = () => (<Button style={{ color: "white" }} 
                                           title="Exit" 
                                           onPress={() => this.props.closeModal()}/>) 
        let renderLeft    = () => (<Button style={{ color: "white" }} 
                                        title="Choose" 
                                        onPress={() => { 
                                            console.log(this.state.selected)
                                            console.log(Object.values(this.state.selected))
                                            this.props.addProducts(Object.values(this.state.selected));
                                            this.setState({ selected : {} }) 
                                            this.props.closeModal(); }} />)

        // Switch to Header component
        return (
            <WhatsAroundHeader
                title={this.headerText}
                renderRight={renderRight}
                renderLeft={renderLeft}
                />
        )
    }
    
    /**
     * 
     */
    render() {
        return (
            <Modal
                visible={this.props.visible}
                animationType='slide'
                onRequestClose={() => this.props.closeModal()}
            >
                <View style={styles.container}>
                    {this._renderHeader()}
                        <FlatList
                            data={this.state.photos}
                            numColumns={3}
                            renderItem={this._renderImageTile}
                            keyExtractor={(_,index) => index}
                            onEndReached={async () => await this._getPhotos()}
                            onEndReachedThreshold={0.5}
                            // TODO
                            ListEmptyComponent={<Text>Loading...</Text>}
                            initialNumToRender={100}
                            getItemLayout={this._getItemLayout}
                            />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
    },
    header: {
        height: 40,
        width: width,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20
    },
})