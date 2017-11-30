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
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux'

import Constants from "../constants"
import Styles from "./commissary_styles"

import Book from './book/Book';
import Category from './categories/Category';
import Canteen from './canteen/Canteen';

import { initCanteen } from './canteen/actions'
import { tradeStamp } from '../game/stamps/actions'

class CommissaryClass extends Component {

  constructor(props) {
    super(props);

    fetch(Constants.canteen)
    .then(res => res.json())
    .then( items => {
      this.props.initCanteen(items);
    });

    this.state = {
      tradePressed: false,
    }
  }

  _pressTrade() {
    this.setState({ tradePressed: !this.state.tradePressed })
    let items = this.props.canteen.canteen;
    let pressedItem = items.filter( item => item.pressed );
    let item = pressedItem[0];
    if ( !item ){
      Alert.alert("You do not have an item selected for trade.")
      return;
    }
    let cost = item.value;
    let stmps = this.props.stamps.stamps
    let tillCount = 0;
    let selected_stamps = [];
    stmps.forEach( val => {
      if (val.pressed) {
        selected_stamps.push(val)
        tillCount++;
      }
    })

    if ( tillCount === cost ){
      let stamp_ids = selected_stamps.map( stamp => {
        return { id: stamp.id, idx: stamp.idx };
      })
      fetch(Constants.get_stamp, {
        headers: Constants.headers,
        method: "POST",
        body: JSON.stringify({ id: item.id })
      })
      .then( response => {
        let new_stamp = JSON.parse(response._bodyText)
        this.props.tradeStamp({ new_stamp, stamp_ids });
      })
    } else {
      Alert.alert("You do not have enough stamps selected for trade!")
    }
  }

  render() {
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

    if (this.state.tradePressed) {
      Styles.tradeButton.borderColor = 'black';
    } else {
      Styles.tradeButton.borderColor = 'white';
    }

    return (
        <View style={ Styles.commissaryContainer }>
          <Text style={ Styles.tradeHead }>Store</Text>
            { category.map( cat => {
                if (cat.pressed){
                    let ttl = 'Trades for ' + cat.title + 's'
                    return <View style={ Styles.posView }>
                              <View style={ Styles.tradeBar }>
                                <Text style={ Styles.posHead }>{ ttl }</Text>
                                <TouchableOpacity
                                  style={ Styles.tradeButton }
                                  onPress={ this._pressTrade.bind(this) }
                                >
                                  <Text style={ Styles.tradeButtonText }>Trade</Text>
                                </TouchableOpacity>
                              </View>
                              <ScrollView
                                    horizontal={ true }
                                    style={ Styles.scrollStyle }
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
          <View style={ Styles.tradeContainerStyle } >
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
          <View style={ Styles.bookContainer} >
            <Text style={ Styles.tradeHead } >My Book</Text>
            <View style={ Styles.bookContainer} >
              <Text style={ Styles.stampsHead }>Till:</Text>
              <Text style={ Styles.stampsHead }> { tillCount } </Text>
            </View>
          </View>
          <ScrollView style={ Styles.stampContainerStyle } >
            { book.map( (stamp, idx) => {
                if (stamp.show){
                  let col = 'white';
                  if (stamp.pressed) col = 'gold';
                  return <Book
                            key={ idx }
                            stampProps={ stamp.title }
                            id={ stamp.id }
                            bc={ col }
                            stampButtonStyles={ Styles.stampButtonStyles }
                            stampTextStyles={ Styles.stampTextStyles }
                          ></Book>
                }
            })}
          </ScrollView>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    initCanteen: ( items ) => {
      dispatch( initCanteen( items ) );
    },
    tradeStamp: ( payload ) => {
      dispatch( tradeStamp( payload ) );
    }
  }
}

CommissaryClass = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissaryClass);

export default CommissaryClass;