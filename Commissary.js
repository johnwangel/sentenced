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

import StampComm from './CommissaryStamps';
import StoreComm from './CommissaryStore';
import StoreStamp from './StoreStamp';

class CommissaryClass extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let backcolor = 'white';
    if (this.props.pos.pressed) {
        backcolor = 'blue';
    }

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
          <View style={ styles.tradeContainerStyle } >
            { this.props.pos.map( (p, idx) => {
                let fontColor= 'blue';
                let backColor= 'white';
                if (p.pressed){
                  fontColor = 'white';
                  backColor = 'blue';
                }
                return <StoreComm
                          key={ idx }
                          partOfSpeech={ p.title }
                          pressed={ p.pressed }
                          index={ p.id }
                          fontColor={ fontColor }
                          backColor={ backColor }
                        ></StoreComm>
            })}
            { this.props.pos.map( p => {
                if (p.pressed){
                    let ttl = 'Trades for ' + p.title + 's'
                    return <View style={ styles.posView }>
                              <Text style={ styles.posHead }>{ ttl }</Text>
                              <ScrollView
                                    horizontal={ true }
                                    style={ scrollStyle }
                                  >
                                  { this.props.store.map( (stamp, idx) => {
                                    if ( p.title === stamp.pos ) {
                                      return <StoreStamp
                                            key={ idx }
                                            stampProps={ stamp }
                                          ></StoreStamp>
                                   }}
                                  )}
                            </ScrollView>
                          </View>
                }
              })
          }
          </View>
          <Text style={ styles.tradeHead } >My Book</Text>
          <ScrollView style={ styles.stampContainerStyle } >
            { this.props.stamps.map( (stamp, idx) => {
                return <StampComm
                          key={ idx }
                          stampProps={ stamp }
                          stampButtonStyles={ styles.stampButtonStyles }
                          stampTextStyles={ styles.stampTextStyles }
                        ></StampComm>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updatePresses: ( changeIDs ) => {
//       dispatch( updateSentence( changeIDs ) );
//     },
//   }
// }

CommissaryClass = connect(
  mapStateToProps
  // mapDispatchToProps
)(CommissaryClass);

export default CommissaryClass;