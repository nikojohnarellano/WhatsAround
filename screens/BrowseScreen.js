import React from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { Container, Content, Header, Item, Input, Icon, Button, Text } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { ExpoLinksView } from '@expo/samples';

const { width }  = Dimensions.get("window");
const imageWidth = width /2 ;

const Images = [
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" },
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" },{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfY6fOkFdeSYVrDxxiSjNnTOjpbdi-iZ97CCAsG2pbTv8734RuQ" },
    { uri: "https://rukminim1.flixcart.com/image/312/312/hand-messenger-bag/g/s/g/fd-handbag-0028-fair-deals-hand-held-bag-texture-original-imaencs3dm3hqmen.jpeg?q=70" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/0/08/LGwashingmachine.jpg" },
    { uri: "http://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10486/10486204_2.jpg" }
]

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    var chunkSize = 2;
    var groups    = Images.map((item, index) =>
                    {
                        return index%chunkSize===0 ? Images.slice(index,index+chunkSize) : null;
                    })
                    .filter(function(e)
                    {
                        return e;
                    });
      return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                    <Icon name="ios-people" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content>
                { groups.map((item, indexRow) => {
                    return (
                        <Row key={indexRow}>
                            {item.map((i, indexCol) => {
                                return(
                                    <Col key={indexCol}>
                                        <Image style={{height: 200, width: imageWidth  }} source={i} />
                                    </Col>
                                );
                            })}
                        </Row>
                    )
                }) }
            </Content>
        </Container>
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
