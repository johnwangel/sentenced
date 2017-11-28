import React, { Component } from 'react';
import {
  Alert,
  Animated,
  AppRegistry,
  Button,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux'

import Constants from "../constants"

import Book from './book/Book';
import Category from './categories/Category';
import Canteen from './canteen/Canteen';

import { initCanteen } from './canteen/actions'

class CommissaryClass extends Component {

  constructor(props) {
    super(props);

    fetch(Constants.canteen)
    .then(res => res.json())
    .then( items => {
      this.props.initCanteen(items);
    });
  }

  render() {
    // console.log("PROPS FROM COMMISSARY", this.props)

    let canteen = this.props.canteen.canteen;
    let category = this.props.categories.categories;
    let book = this.props.stamps.stamps

    let backcolor = 'white';
    if (category.pressed) backcolor = 'blue';

    let stmps = this.props.stamps.stamps
    let tillCount = 0;
    stmps.forEach( val => {
      if (val.pressed) tillCount++;
    })

    let scrollStyle = {
       marginLeft: 2,
       marginTop: 2,
       height: 70,
       flex: 0,
       flexDirection: 'row',
       justifyContent: 'flex-start',
       padding: 5,
       backgroundColor: 'blue',
    }

    return (

        <View style={ styles.commissaryContainer }>
          <Text style={ styles.tradeHead }>Store</Text>
            { category.map( cat => {
                if (cat.pressed){
                    let ttl = 'Trades for ' + cat.title + 's'
                    return <View style={ styles.posView }>
                              <Text style={ styles.posHead }>{ ttl }</Text>
                              <ScrollView
                                    horizontal={ true }
                                    style={ scrollStyle }
                                  >
                                  { canteen.map( (item, idx) => {
                                    if ( cat.title === item.pos ) {
                                      return <Canteen
                                            key={ idx }
                                            itemProps={ item }
                                          ></Canteen>
                                   }}
                                  )}
                            </ScrollView>
                          </View>
                }
              })
          }
          <View style={ styles.tradeContainerStyle } >
            { category.map( (cat, idx) => {
                let fontColor= 'blue';
                let backColor= 'white';
                if (cat.pressed){
                  fontColor = 'white';
                  backColor = 'blue';
                }
                return <Category
                          key={ idx }
                          partOfSpeech={ cat.title }
                          pressed={ cat.pressed }
                          index={ cat.id }
                          fontColor={ fontColor }
                          backColor={ backColor }
                        ></Category>
            })}
          </View>
          <View style={ styles.bookContainer} >
            <Text style={ styles.tradeHead } >My Book</Text>
            <View style={ styles.bookContainer} >
              <Text style={ styles.stampsHead }>Till:</Text>
              <Text style={ styles.stampsHead }> { tillCount } </Text>
            </View>
          </View>
          <ScrollView style={ styles.stampContainerStyle } >
            { book.map( (stamp, idx) => {
                let col = 'white';
                if (stamp.pressed) col = 'gold';
                return <Book
                          key={ idx }
                          stampProps={ stamp.title }
                          id={ stamp.id }
                          bc={ col }
                          stampButtonStyles={ styles.stampButtonStyles }
                          stampTextStyles={ styles.stampTextStyles }
                        ></Book>
            })}
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  commissaryContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tradeHead: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: Dimensions.get('window').height/40,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  tradeContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 5,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  posView: {
    margin: 0,
    padding: 0,
    marginTop: 5,
    backgroundColor: 'blue',
  },
  posHead: {
    minWidth: '100%',
    color: 'blue',
    padding: 5,
    fontSize: Dimensions.get('window').height/40,
    textAlign: 'left',
    backgroundColor: 'gold',
  },
  bookContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  stampsHead: {
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: Dimensions.get('window').height/40,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  stampContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 20,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'left',
    flexWrap: 'wrap',
    minWidth: '100%',
  },
  stampButtonStyles: {
    width: '100%',
    backgroundColor: 'white',
    margin: 5,
  },
  stampTextStyles: {
    padding: 5,
    textAlign: 'center',
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 3,
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    initCanteen: ( items ) => {
      dispatch( initCanteen( items ) );
    }
  }
}

CommissaryClass = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissaryClass);

export default CommissaryClass;