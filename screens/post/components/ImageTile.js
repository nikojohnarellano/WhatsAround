import React from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
const { width } = Dimensions.get('window');

export default class ImageTile extends React.PureComponent {
    render() {
        const { item, index, selectImage, selected } = this.props;

        if(!item) return null;

        return (
            <TouchableHighlight
                style={{
                    backgroundColor : selected ? "#0099CC" : "white",
                    width: width / 3, 
                    height : width / 3,
                    justifyContent : "center",
                    alignItems : "center"
                }}
                underlayColor='transparent'
                onPress={() => selectImage(item)}
                >
                <Image 
                    style={{
                        padding : 5,
                        width : "90%",
                        height : "90%",
                        borderRadius : selected ? 5 : 0
                    }}
                    source={{ uri :item.uri }}
                    />
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        padding: 5,
        elevation: 2,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        overflow: "hidden",
    },

    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
})